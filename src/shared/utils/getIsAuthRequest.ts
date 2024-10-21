import { AUTH_EXCLUDED_PATHS } from "@/src/shared/constants/api";
import { InternalAxiosRequestConfig } from "axios";

export default function getIsAuthRequest(
  config: InternalAxiosRequestConfig<any>
) {
  return AUTH_EXCLUDED_PATHS.some((url) => config.url?.includes(url));
}
