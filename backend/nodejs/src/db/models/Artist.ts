import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { Album } from "./Album";

@Table
export class Artist extends Model<Artist> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => Album, { foreignKey: { allowNull: true } })
  albums!: Album[];
}
