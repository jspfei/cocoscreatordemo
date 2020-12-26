export class ImageRequestVo {

  /**
   * 请求初始化
   * @param url 
   * @param ext 
   */
  public constructor(public url: string, public ext?: string) {
     this.url = url;
     this.ext = ext;
  }
}