import dotenv from "dotenv";
dotenv.config();
import {
  Artist,
  Album,
  Genre,
  MediaType,
  Track,
  Playlist,
  PlaylistTrack,
  Customer,
  Invoice,
  InvoiceLine,
  Employee,
} from "./models";
import { faker } from "@faker-js/faker";
import { syncDb, sequelize } from ".";

const seedEmployees = async (count: number) => {
  const employees = [];
  for (let i = 0; i < count; i++) {
    employees.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      title: faker.person.jobTitle(),
      birthDate: faker.date.past({ years: 50, refDate: new Date(2000, 0, 1) }),
      hireDate: faker.date.past({ years: 20 }),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      fax: faker.phone.number(),
      email: faker.internet.email(),
      reportsTo: null, // Initially set to null, we'll update this below
    });
  }
  const createdEmployees = await Employee.bulkCreate(employees as Employee[]);

  // Update the 'reportsTo' field to establish hierarchy
  for (let i = 0; i < createdEmployees.length; i++) {
    if (i > 0) {
      // Let's make every employee (except the first one) report to an employee
      const reportToId =
        createdEmployees[faker.number.int({ min: 0, max: i - 1 })].id;
      await createdEmployees[i].update({ reportsTo: reportToId });
    }
  }
};

const seedArtists = async (count: number) => {
  const artists = [];
  for (let i = 0; i < count; i++) {
    artists.push({
      name: faker.music.genre(),
    });
  }
  await Artist.bulkCreate(artists as Artist[]);
};

const seedAlbums = async (count: number) => {
  const albums = [];
  const artistIds = await Artist.findAll({ attributes: ["id"] });
  for (let i = 0; i < count; i++) {
    albums.push({
      title: faker.word.sample(),
      artistId:
        artistIds[faker.number.int({ min: 0, max: artistIds.length - 1 })].id,
    });
  }
  await Album.bulkCreate(albums as Album[]);
};

const seedGenres = async (count: number) => {
  const genres = [];
  for (let i = 0; i < count; i++) {
    genres.push({
      name: faker.music.genre(),
    });
  }
  await Genre.bulkCreate(genres as MediaType[]);
};

const seedMediaTypes = async (count: number) => {
  const mediaTypes = [];
  for (let i = 0; i < count; i++) {
    mediaTypes.push({
      name: faker.lorem.word(),
    });
  }
  await MediaType.bulkCreate(mediaTypes as MediaType[]);
};

const seedTracks = async (count: number) => {
  const tracks = [];
  const albumIds = await Album.findAll({ attributes: ["id"] });
  const genreIds = await Genre.findAll({ attributes: ["id"] });
  const mediaTypeIds = await MediaType.findAll({ attributes: ["id"] });
  for (let i = 0; i < count; i++) {
    tracks.push({
      name: faker.music.songName(),
      albumId:
        albumIds[faker.number.int({ min: 0, max: albumIds.length - 1 })].id,
      mediaTypeId:
        mediaTypeIds[faker.number.int({ min: 0, max: mediaTypeIds.length - 1 })]
          .id,
      genreId:
        genreIds[faker.number.int({ min: 0, max: genreIds.length - 1 })].id,
      composer: faker.person.fullName(),
      milliseconds: faker.number.int({ min: 180000, max: 300000 }), // 3 to 5 minutes
      bytes: faker.number.int({ min: 3000000, max: 7000000 }), // 3MB to 7MB
      unitPrice: faker.number.float({ min: 0.99, max: 1.99 }),
    });
  }
  await Track.bulkCreate(tracks as Track[]);
};

const seedPlaylists = async (count: number) => {
  const playlists = [];
  for (let i = 0; i < count; i++) {
    playlists.push({
      name: faker.lorem.words(2),
    });
  }
  await Playlist.bulkCreate(playlists as Playlist[]);
};

const seedPlaylistTracks = async (count: number) => {
  const playlistTracks = [];
  const trackIds = await Track.findAll({ attributes: ["id"] });
  const playlistIds = await Playlist.findAll({ attributes: ["id"] });
  for (let i = 0; i < count; i++) {
    playlistTracks.push({
      playlistId:
        playlistIds[faker.number.int({ min: 0, max: playlistIds.length - 1 })]
          .id,
      trackId:
        trackIds[faker.number.int({ min: 0, max: trackIds.length - 1 })].id,
    });
  }
  await PlaylistTrack.bulkCreate(playlistTracks);
};

const seedCustomers = async (count: number) => {
  const customers = [];
  for (let i = 0; i < count; i++) {
    customers.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      fax: faker.phone.number(),
      email: faker.internet.email(),
      supportRepId: faker.number.int({ min: 1, max: 3 }), // Assuming first 3 employees are support reps
    });
  }
  await Customer.bulkCreate(customers as Customer[]);
};

const seedInvoices = async (count: number) => {
  const invoices = [];
  const customerIds = await Customer.findAll({ attributes: ["id"] });
  for (let i = 0; i < count; i++) {
    invoices.push({
      customerId:
        customerIds[faker.number.int({ min: 0, max: customerIds.length - 1 })]
          .id,
      invoiceDate: faker.date.past(),
      billingAddress: faker.location.streetAddress(),
      billingCity: faker.location.city(),
      billingState: faker.location.state(),
      billingCountry: faker.location.country(),
      billingPostalCode: faker.location.zipCode(),
      total: faker.number.float({ min: 10, max: 100 }),
    });
  }
  await Invoice.bulkCreate(invoices as Invoice[]);
};

const seedInvoiceLines = async (count: number) => {
  const invoiceLines = [];
  const invoiceIds = await Invoice.findAll({ attributes: ["id"] });
  const trackIds = await Track.findAll({ attributes: ["id"] });
  for (let i = 0; i < count; i++) {
    invoiceLines.push({
      invoiceId:
        invoiceIds[faker.number.int({ min: 0, max: invoiceIds.length - 1 })].id,
      trackId:
        trackIds[faker.number.int({ min: 0, max: trackIds.length - 1 })].id,
      unitPrice: faker.number.float({ min: 0.99, max: 1.99 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
    });
  }
  await InvoiceLine.bulkCreate(invoiceLines as InvoiceLine[]);
};

const seedDatabase = async () => {
  try {
    await syncDb();
    console.log("Database synced!");

    await seedEmployees(10); // Seed 10 employees
    await seedArtists(10); // Seed 10 artists
    await seedAlbums(20); // Seed 20 albums
    await seedGenres(10); // Seed 10 genres
    await seedMediaTypes(5); // Seed 5 media types
    await seedTracks(100); // Seed 100 tracks
    await seedPlaylists(10); // Seed 10 playlists
    await seedPlaylistTracks(200); // Seed 200 playlist tracks
    await seedCustomers(50); // Seed 50 customers
    await seedInvoices(100); // Seed 100 invoices
    await seedInvoiceLines(200); // Seed 200 invoice lines

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
