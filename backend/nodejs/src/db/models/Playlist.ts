import {
  Table,
  Column,
  Model,
  BelongsToMany,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from "sequelize-typescript";
import { Track } from "./Track";
import { PlaylistTrack } from "./PlaylistTrack";

@Table
export class Playlist extends Model<Playlist> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING })
  name!: string;

  @BelongsToMany(() => Track, () => PlaylistTrack)
  tracks!: Track[];

  // @ForeignKey(() => Track)
  // @Column({ type: DataType.INTEGER, allowNull: true })
  // trackId!: number;
}
