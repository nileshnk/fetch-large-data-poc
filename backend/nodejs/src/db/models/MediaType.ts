import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { Track } from "./Track";

@Table
export class MediaType extends Model<MediaType> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING })
  name!: string;

  @HasMany(() => Track, { foreignKey: { allowNull: true } })
  tracks!: Track[];
}
