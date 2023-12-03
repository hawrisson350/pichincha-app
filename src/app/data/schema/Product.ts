export class Product {

  private id: string;
  private name: string;
  private description: string;
  private logo: string;
  private date_release: string;
  private date_revision: string;

  constructor(
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.date_release = date_release;
    this.date_revision = date_revision;
  }


  public matches(params: Partial<Product>): boolean {
    return !Object.entries(params).some(([k, v]) => {
      return this[k as keyof Product] !== v;
    })
  }


  /**
   * Getter $id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Getter $description
   * @return {string}
   */
  public get $description(): string {
    return this.description;
  }

  /**
   * Getter $logo
   * @return {string}
   */
  public get $logo(): string {
    return this.logo;
  }

  /**
   * Getter $date_release
   * @return {string}
   */
  public get $date_release(): string {
    return this.date_release;
  }

  /**
   * Getter $date_revision
   * @return {string}
   */
  public get $date_revision(): string {
    return this.date_revision;
  }

  /**
   * Setter $id
   * @param {string} value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
   * Setter $description
   * @param {string} value
   */
  public set $description(value: string) {
    this.description = value;
  }

  /**
   * Setter $logo
   * @param {string} value
   */
  public set $logo(value: string) {
    this.logo = value;
  }

  /**
   * Setter $date_release
   * @param {string} value
   */
  public set $date_release(value: string) {
    this.date_release = value;
  }

  /**
   * Setter $date_revision
   * @param {string} value
   */
  public set $date_revision(value: string) {
    this.date_revision = value;
  }

}
