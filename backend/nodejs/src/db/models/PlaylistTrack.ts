import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
  PrimaryKey,
  Unique,
  AutoIncrement,
} from "sequelize-typescript";
import { Playlist } from "./Playlist";
import { Track } from "./Track";

@Table({ tableName: "PlaylistTracks" })
export class PlaylistTrack extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @ForeignKey(() => Playlist)
  @Unique("unique_playlist_track") // Unique constraint for combination of playlistId and trackId
  @Column({ type: DataType.INTEGER, allowNull: true }) // Making playlistId nullable
  playlistId!: number;

  @ForeignKey(() => Track)
  @Unique("unique_playlist_track") // Unique constraint for combination of playlistId and trackId
  @Column({ type: DataType.INTEGER, allowNull: true }) // Making trackId nullable
  trackId!: number;

  @BelongsTo(() => Playlist)
  playlist!: Playlist;

  @BelongsTo(() => Track)
  track!: Track;
}
