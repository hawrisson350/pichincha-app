export class Product {

  private id: string;
  private name: string;
  private description: string;
  private logo: string;
  private date_release: Date;
  private date_revision: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: Date,
    date_revision: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.date_release = date_release;
    this.date_revision = date_revision;
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
   * @return {Date}
   */
  public get $date_release(): Date {
    return this.date_release;
  }

  /**
   * Getter $date_revision
   * @return {Date}
   */
  public get $date_revision(): Date {
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
   * @param {Date} value
   */
  public set $date_release(value: Date) {
    this.date_release = value;
  }

  /**
   * Setter $date_revision
   * @param {Date} value
   */
  public set $date_revision(value: Date) {
    this.date_revision = value;
  }

}
