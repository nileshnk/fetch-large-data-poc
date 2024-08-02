import { Sequelize } from "sequelize-typescript";
import { Album } from "./models/Album";
import { Artist } from "./models/Artist";
import { Track } from "./models/Track";
import { Genre } from "./models/Genre";
import { Invoice } from "./models/Invoice";
import { InvoiceLine } from "./models/InvoiceLine";
import { Customer } from "./models/Customer";
import { Employee } from "./models/Employee";
import { MediaType } from "./models/MediaType";
import { Playlist } from "./models/Playlist";
import { PlaylistTrack } from "./models/PlaylistTrack";
import { Config } from "../config/env";
const sequelize = new Sequelize({
  database: Config.database.name,
  dialect: Config.database.dialect,
  username: Config.database.username,
  password: Config.database.password,
  host: Config.database.host,
  port: Config.database.port,
  models: [
    Album,
    Artist,
    Track,
    Genre,
    Invoice,
    InvoiceLine,
    Customer,
    Employee,
    MediaType,
    Playlist,
    PlaylistTrack,
  ],
  dialectOptions: {
    connectTimeout: 60000, // 60 seconds
  },
  logging: false,
});

export { sequelize };
