### Setting Up Gmail API Access

To successfully set up access to the Gmail API, follow these detailed steps:

1. **Access the Google Cloud Console**: Navigate to [Google Cloud Console](https://console.cloud.google.com/).
2. **Create or Select a Project**: Either create a new project or select an existing one from the project dropdown.
3. **Open APIs & Services Dashboard**: In the left sidebar, find and click on "APIs & Services" to access the dashboard.
4. **Enable Gmail API**: Click on "Enable APIs and Services", then search for "Gmail API" in the API library. Click on it and enable the API.
5. **Navigate to Credentials**: On the left sidebar, click on the "Credentials" tab to manage your API credentials.
6. **Create OAuth Client ID**: Click on "Create Credentials" and choose "OAuth client ID" from the dropdown menu.
7. **Configure Consent Screen**: Fill out the required fields to configure the consent screen, ensuring you provide all necessary information.
8. **Select Application Type**: Choose "Desktop app" as the application type for your OAuth client.
9. **Name Your Client**: Provide a name for your client application and click "Create" to generate your credentials.
10. **Download Credentials**: After creation, download the credentials JSON file by clicking the download icon next to your newly created OAuth 2.0 client ID.
11. **Save the JSON File**: Store the downloaded JSON file as `credentials.json` in your project directory.

### Generating Token File

1. **Download `credentials.json`**: Ensure you have downloaded the `credentials.json` file from the Google Cloud Console.
2. **Generate `token.json`**: Run the following command to generate the `token.json` file:
   ```
   node <node_modules>/gmail-tester/init.js <path-to-credentials.json> <path-to-token.json> <target-email>
   ```
   **Example Command**:
   ```
   node node_modules/gmail-tester/init.js ./src/tests/gmail/credentials.json ./src/tests/gmail/token.json suphachok.dev@gmail.com
   ```

Make sure to replace `<path-to-credentials.json>`, `<path-to-token.json>`, and `<target-email>` with the appropriate values for your setup.
