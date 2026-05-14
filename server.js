const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");

const { Server } =
  require("socket.io");

const authRoutes =
  require("./routes/auth");

const appointmentRoutes =
  require("./routes/appointments");

const doctorRoutes =
  require("./routes/doctorRoutes");

const patientHistoryRoutes =
  require("./routes/patientHistoryRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/doctors",
  doctorRoutes
);

app.use(
  "/api/patient-history",
  patientHistoryRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Backend Running 🚀"
  );
});

const server =
  http.createServer(app);

const io =
  new Server(server, {
    cors: {
      origin:
        "http://localhost:3000",
      methods: [
        "GET",
        "POST",
      ],
    },
  });

io.on("connection", (socket) => {

  console.log(
    "User Connected:",
    socket.id
  );

  socket.on(
    "join-room",
    (roomId) => {

      socket.join(roomId);

      socket.to(roomId).emit(
        "user-joined"
      );
    }
  );

  socket.on(
    "offer",
    ({ roomId, offer }) => {

      socket.to(roomId).emit(
        "offer",
        offer
      );
    }
  );

  socket.on(
    "answer",
    ({ roomId, answer }) => {

      socket.to(roomId).emit(
        "answer",
        answer
      );
    }
  );

  socket.on(
    "ice-candidate",
    ({ roomId, candidate }) => {

      socket.to(roomId).emit(
        "ice-candidate",
        candidate
      );
    }
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        "User Disconnected"
      );
    }
  );
});

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );
});