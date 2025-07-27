import { Base_URL } from "./constants";
import { ApiResponse, getRequest } from "./requests";
import { NewsApiResponse } from "./types";

const apikey = import.meta.env.VITE_API_KEY;

export const getTopHeadLines = async (
  category?: string,
  pageNo?: number
): Promise<ApiResponse<NewsApiResponse>> => {
  const url = `${Base_URL}/top-headlines?country=us&apiKey=${apikey}${
    category ? `&category=${category}` : ""
  }${pageNo ? `&page=${pageNo}` : ""}`;

  return await getRequest<NewsApiResponse>(url);
};

export const getByQuery = async (
  query: string,
  pageNo?: number
): Promise<ApiResponse<NewsApiResponse>> => {
  const url = `${Base_URL}/everything?apiKey=${apikey}${
    query ? `&q=${query}` : ""
  }${pageNo ? `&page=${pageNo}` : ""}&pageSize=20`;

  return await getRequest<NewsApiResponse>(url);
};
