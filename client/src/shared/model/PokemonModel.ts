export interface IPokemon {
  id?: number;
  name?: string;
  base_experience?: number;
  height?: number;
  is_default?: boolean;
  order?: number;
  weight?: number;
  abilities?: IPokemonAblity[];
  form?: NamedResource[];
  location_area_encounters?: string;
  moves?: IPokemonMove[];
  sprites?: IPokemonSprite;
  species?: NamedResource;
  stats?: IPokemonStat[];
  types?: IPokemonType[];
}

export interface IPokemonSprite {
  front_default?: string;
  front_shiny?: string;
  back_default?: string;
  back_shiny?: string;
}

export interface IPokemonAblity {
  is_hidden?: boolean;
  slot?: number;
  ability: NamedResource;
}

export interface IPokemonStat {
  stat?: NamedResource;
  effort?: number;
  base_stat?: number;
}

export interface IPokemonType {
  slot?: number;
  type?: NamedResource;
}

export interface IPokemonMove {
  move?: NamedResource;
  version_group_details?: IPokemonMoveVersion[];
}

export interface IPokemonMoveVersion {
  move_learn_method?: NamedResource;
  version_group?: NamedResource;
  level_learned_at?: number;
}

export interface PokemonPagination {
  count?: number;
  next?: string;
  previous?: string;
  results?: NamedResource[];
}

export interface NamedResource {
  name?: string;
  url?: string;
  // custom field
  nickname?: string;
  prevNickname?: string;
}
