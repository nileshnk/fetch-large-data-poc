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
async function seedDatabase(recordCount: number) {
  try {
    // Ensure all models are synced
    await syncDb();

    // Seed data for each model
    await seedMediaTypes();
    await seedGenres();
    await seedEmployees(recordCount);
    await seedCustomers(recordCount * 2); // Assuming we want more customers than employees
    await seedArtists(recordCount * 2);
    await seedAlbums(recordCount * 3);
    await seedTracks(recordCount * 10);
    await seedPlaylists(recordCount);
    await seedInvoices(recordCount * 5);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
}

// Individual seeding functions
async function seedMediaTypes() {
  const mediaTypes = [
    { name: "MPEG audio file" },
    { name: "Protected AAC audio file" },
    { name: "Protected MPEG-4 video file" },
    { name: "Purchased AAC audio file" },
    { name: "AAC audio file" },
  ];
  await MediaType.bulkCreate(mediaTypes as MediaType[]);
}

async function seedGenres() {
  const genres = [
    { name: "Rock" },
    { name: "Jazz" },
    { name: "Metal" },
    { name: "Alternative & Punk" },
    { name: "Rock And Roll" },
    { name: "Blues" },
    { name: "Latin" },
    { name: "Reggae" },
    { name: "Pop" },
    { name: "Classical" },
  ];
  await Genre.bulkCreate(genres as Genre[]);
}

// Individual seeding functions
async function seedEmployees(count: number) {
  const employees = [];
  for (let i = 0; i < count; i++) {
    employees.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      title: faker.person.jobTitle(),
      reportsTo: i > 0 ? faker.number.int({ min: 1, max: i }) : null,
      birthDate: faker.date.past(),
      hireDate: faker.date.past(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      fax: faker.phone.number(),
      email: faker.internet.email(),
    });
  }
  await Employee.bulkCreate(employees as Employee[]);
}

async function seedCustomers(count: number) {
  const customers = [];
  const employeeIds = await Employee.findAll({
    attributes: ["id"],
  });

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
      supportRepId: faker.helpers.arrayElement(employeeIds).id,
    });
  }
  await Customer.bulkCreate(customers as Customer[]);
}

async function seedArtists(count: number) {
  const artists = [];
  for (let i = 0; i < count; i++) {
    artists.push({
      name: faker.person.fullName(),
    });
  }
  await Artist.bulkCreate(artists as Artist[]);
}

async function seedAlbums(count: number) {
  const albums = [];
  const artistIds = await Artist.findAll({ attributes: ["id"] });

  for (let i = 0; i < count; i++) {
    albums.push({
      title: faker.music.songName(),
      artistId: faker.helpers.arrayElement(artistIds).id,
    });
  }
  await Album.bulkCreate(albums as Album[]);
}

async function seedTracks(count: number) {
  const tracks = [];
  const albumIds = await Album.findAll({ attributes: ["id"] });
  const genreIds = await Genre.findAll({ attributes: ["id"] });
  const mediaTypeIds = await MediaType.findAll({
    attributes: ["id"],
  });

  for (let i = 0; i < count; i++) {
    tracks.push({
      name: faker.music.songName(),
      albumId: faker.helpers.arrayElement(albumIds).id,
      mediaTypeId: faker.helpers.arrayElement(mediaTypeIds).id,
      genreId: faker.helpers.arrayElement(genreIds).id,
      composer: faker.person.fullName(),
      milliseconds: faker.number.int({ min: 30000, max: 600000 }),
      bytes: faker.number.int({ min: 2000000, max: 10000000 }),
      unitPrice: faker.number.float({ min: 0.99, max: 1.99, multipleOf: 0.01 }),
    });
  }
  await Track.bulkCreate(tracks as Track[]);
}

async function seedPlaylists(count: number) {
  const playlists = [];
  for (let i = 0; i < count; i++) {
    playlists.push({
      name: faker.music.genre(),
    });
  }
  const createdPlaylists = await Playlist.bulkCreate(playlists as Playlist[]);

  // Associate tracks with playlists
  const tracks = await Track.findAll();
  for (const playlist of createdPlaylists) {
    const trackCount = faker.number.int({ min: 5, max: 20 });
    const playlistTracks = faker.helpers.arrayElements(tracks, trackCount);

    // Instead of using addTracks, we'll create PlaylistTrack records directly
    const playlistTrackRecords = playlistTracks.map((track) => ({
      playlistId: playlist.id,
      trackId: track.id,
    }));

    await PlaylistTrack.bulkCreate(playlistTrackRecords, {
      ignoreDuplicates: true,
    });
  }
}

async function seedInvoices(count: number) {
  const invoices = [];
  const customerIds = await Customer.findAll({
    attributes: ["id"],
  });

  for (let i = 0; i < count; i++) {
    const customerId = faker.helpers.arrayElement(customerIds).id;
    const customer = await Customer.findByPk(customerId);

    if (customer) {
      invoices.push({
        customerId: customerId,
        invoiceDate: faker.date.past(),
        billingAddress: customer.address,
        billingCity: customer.city,
        billingState: customer.state,
        billingCountry: customer.country,
        billingPostalCode: customer.postalCode,
        total: faker.number.float({ min: 1, max: 100, multipleOf: 0.01 }),
      });
    } else {
      console.error("Customer not found for customerId:", customerId);
    }
  }
  const createdInvoices = await Invoice.bulkCreate(invoices as Invoice[]);

  // Create invoice lines for each invoice
  for (const invoice of createdInvoices) {
    const lineCount = faker.number.int({ min: 1, max: 5 });
    const tracks = await Track.findAll({
      order: sequelize.literal("RANDOM()"),
      limit: lineCount,
    });

    const invoiceLines = tracks.map((track) => ({
      invoiceId: invoice.id,
      trackId: track.id,
      unitPrice: track.unitPrice,
      quantity: faker.number.int({ min: 1, max: 5 }),
    }));

    await InvoiceLine.bulkCreate(invoiceLines as InvoiceLine[]);
  }
}

seedDatabase(100);

// Export the main seeding function
// module.exports = seedDatabase;
