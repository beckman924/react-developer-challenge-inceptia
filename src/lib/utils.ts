import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Clients, Cases } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchClients(): Promise<Clients[]> {
  try {
    const response = await fetch("http://localhost:3000/api", {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching clients");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        `Response is not an array of clients: ${JSON.stringify(data)}`
      );
    }

    return data;
  } catch (error: any) {
    throw new Error(`Error fetching clients: ${error}`);
  }
}

export async function inboundCase(url: string): Promise<Cases> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error}`);
  }
}
