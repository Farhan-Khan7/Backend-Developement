CREATE TABLE ipl_players (
    player_id SERIAL PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    player_team_name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    runs_scored INT CHECK (runs_scored > 0),
    wickets_taken INT CHECK (wickets_taken > 0),
    auction_price_crores INT
);

ALTER TABLE ipl_players
DELETE COLUMN player_nickname VARCHAR(50);