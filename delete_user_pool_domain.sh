#!/bin/bash

# Read the name from package.json
PACKAGE_JSON="package.json"
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "File $PACKAGE_JSON does not exist."
    exit 0
fi

PACKAGE_NAME=$(jq -r '.name' "$PACKAGE_JSON")

if [ -z "$PACKAGE_NAME" ]; then
    echo "Failed to retrieve name from $PACKAGE_JSON."
    exit 0
fi

echo "Package name: $PACKAGE_NAME"


# Define the path to the esbuild.json file
USER_POOL_ID=$(aws cognito-idp list-user-pools --max-results 10 --query "UserPools[?contains(Name, '$PACKAGE_NAME')].Id" --output text)
if [ $? -ne 0 ]; then
    echo "Failed to list user pools."
    exit 0
fi

if [ -z "$USER_POOL_ID" ]; then
    echo "User pool not found."
    exit 0
fi


DOMAIN=$(aws cognito-idp describe-user-pool --user-pool-id "$USER_POOL_ID" --query "UserPool.Domain" --output text)
if [ -z "$DOMAIN" ]; then
    echo "User pool domain not found."
    exit 0
fi


# Delete the user pool domain using AWS CLI
delete_output=$(aws cognito-idp delete-user-pool-domain --domain "$DOMAIN" --user-pool-id "$USER_POOL_ID" 2>&1)
operation_status=$?

# Check if the command was successful
if [ $operation_status -eq 0 ]; then
    echo "Successfully deleted user pool domain: $DOMAIN"
        sleep 5
else 
    if [[ "$delete_output" == *"ConcurrentModificationException"* ]]; then
        echo "Concurrent modification detected. Retrying..."
        sleep 5
        delete_output=$(aws cognito-idp delete-user-pool-domain --domain "$DOMAIN" --user-pool-id "$USER_POOL_ID" 2>&1)
        operation_status=$?
        if [ $operation_status -eq 0 ]; then
            echo "Successfully deleted user pool domain: $DOMAIN"
        else
            echo "Failed to delete user pool domain: $DOMAIN"
            echo "Error details: $delete_output"
            exit 0
        fi
    else
        echo "Failed to delete user pool domain: $DOMAIN"
        echo "Error details: $delete_output"
        exit 0
    fi
fi