import { inject, injectable } from 'inversify'
import jwt, { JwtPayload } from 'jsonwebtoken'
import JwksRsa from 'jwks-rsa'

@injectable()
export default class JwtProvider {
  private jwksClient: JwksRsa.JwksClient

  constructor(@inject('Issuer') issuer: string) {
    this.jwksClient = JwksRsa({
      cache: true,
      rateLimit: true,
      jwksUri: `${issuer}/.well-known/jwks.json`
    })
  }

  public async verify(
    token: string,
    options?: jwt.VerifyOptions
  ): Promise<string | jwt.Jwt | jwt.JwtPayload> {
    try {
      const decodedHeader = this.decode(token) as {
        header: { kid: string }
      } | null

      if (!decodedHeader) {
        throw new Error('Invalid token')
      }

      const key = await this.jwksClient.getSigningKey(decodedHeader.header.kid)
      const signingKey = key.getPublicKey()

      const decoded: string | jwt.Jwt | jwt.JwtPayload | undefined =
        await new Promise((resolve, reject) => {
          jwt.verify(token, signingKey, options, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
          })
        })

      if (!decoded) throw new Error('Invalid token')

      return decoded
    } catch (error) {
      throw new Error('Invalid token')
    }
  }

  public decode(token: string): string | JwtPayload | null {
    return jwt.decode(token, { complete: true })
  }
}
