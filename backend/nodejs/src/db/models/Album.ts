import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Artist } from "./Artist";
import { Track } from "./Track";

@Table
export class Album extends Model<Album> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING })
  title!: string;

  @ForeignKey(() => Artist)
  @Column({ type: DataType.INTEGER, allowNull: true })
  artistId!: number | null;

  @BelongsTo(() => Artist)
  artist!: Artist;

  @HasMany(() => Track)
  tracks!: Track[];
}
