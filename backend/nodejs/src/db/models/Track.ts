import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Album } from "./Album";
import { MediaType } from "./MediaType";
import { Genre } from "./Genre";

@Table
export class Track extends Model<Track> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING })
  name!: string;

  @ForeignKey(() => Album)
  @Column({ type: DataType.INTEGER, allowNull: true }) // Making albumId nullable
  albumId!: number;

  @ForeignKey(() => MediaType)
  @Column({ type: DataType.INTEGER, allowNull: true }) // Making mediaTypeId nullable
  mediaTypeId!: number;

  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER, allowNull: true }) // Making genreId nullable
  genreId!: number;

  @Column({ type: DataType.STRING })
  composer!: string;

  @Column({ type: DataType.INTEGER })
  milliseconds!: number;

  @Column({ type: DataType.INTEGER })
  bytes!: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  unitPrice!: number;

  @BelongsTo(() => Album)
  album!: Album;

  @BelongsTo(() => MediaType)
  mediaType!: MediaType;

  @BelongsTo(() => Genre)
  genre!: Genre;
}
