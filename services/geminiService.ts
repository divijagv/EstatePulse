
import { GoogleGenAI, Type } from "@google/genai";
import { Property, MarketStats } from "../types";

export const getMarketInsights = async (
  filteredData: Property[],
  stats: MarketStats,
  city: string,
  neighborhood: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Prepare a summarized context for the model
  const dataSummary = {
    city,
    neighborhood: neighborhood === 'All' ? 'Whole City' : neighborhood,
    totalListings: filteredData.length,
    avgPrice: stats.avgPrice,
    avgSqft: stats.avgSqft,
    avgPricePerSqft: stats.avgPricePerSqft,
    topPropertyType: getTopPropertyType(filteredData)
  };

  const prompt = `
    As a real estate expert, analyze the following market data for ${dataSummary.neighborhood}, ${dataSummary.city}:
    - Total Listings: ${dataSummary.totalListings}
    - Average Price: $${dataSummary.avgPrice.toLocaleString()}
    - Average Sq Ft: ${dataSummary.avgSqft.toLocaleString()}
    - Price per Sq Ft: $${dataSummary.avgPricePerSqft.toFixed(2)}
    - Primary Property Type: ${dataSummary.topPropertyType}

    Provide a concise 3-paragraph market analysis:
    1. Current market temperature (Buyer's vs Seller's market).
    2. Value assessment based on square footage and price.
    3. Investment outlook for this specific area.
    Use professional but accessible language. Keep it under 200 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Unable to generate insights at this time. Please check your connection and try again.";
  }
};

function getTopPropertyType(data: Property[]): string {
  const counts: Record<string, number> = {};
  data.forEach(p => counts[p.type] = (counts[p.type] || 0) + 1);
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
}
