import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import expenseRoutes from "./routes/expenseRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/api/expenses", expenseRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
