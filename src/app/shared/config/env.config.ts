/**
 * Created by mikkri on 2017-05-14.
 */
export interface EnvConfig {
    API?: string;
    ENV?: string;
}

export const Config: EnvConfig = {
    ENV: process.env.ENV,
    API: process.env.API
};