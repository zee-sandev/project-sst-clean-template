import Linkable from '@root/infra/interfaces/linkable/linkable.abstract'

class WebApp extends Linkable {
  private _environment: Record<string, any> = {}
  private _domainName: string = 'localhost'
  private _domainConfig: sst.aws.NextjsArgs['domain'] = {
    name: this._domainName
  }
  private _port: number = 9000
  private _path: string = 'web'
  constructor() {
    super()
  }

  public set domainName(domainName: string) {
    this._domainName = domainName
  }

  public set domainConfig(domainConfig: sst.aws.NextjsArgs['domain']) {
    this._domainConfig = domainConfig
  }

  public set port(port: number) {
    this._port = port
  }

  public set path(path: string) {
    this._path = path
  }

  public setEnvironment(environment: Record<string, any>) {
    this._environment = environment
  }

  public listen() {
    const app = new sst.aws.Nextjs('web', {
      path: this._path,
      link: this.getLinks(),
      domain: $dev ? undefined : this._domainConfig,
      dev: {
        url: this._domainName,
        // command: `next dev -p ${this._port} --experimental-https --turbo`
        command: `next dev -p ${this._port} --experimental-https `
      },
      environment: {
        NEXTAUTH_URL: this._domainName,
        ...this._environment
      }
    })

    return app
  }
}

export default WebApp
