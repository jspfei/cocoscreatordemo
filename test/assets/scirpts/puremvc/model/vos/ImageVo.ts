export class ImageVo {

  /**
   * 初始化
   * @param name 
   * @param texture 
   */
  public constructor(public name: string, public texture: cc.Texture2D) {
      this.name = name;
      this.texture = texture;
  }
}