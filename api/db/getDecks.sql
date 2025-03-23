USE flashcard_app;

SELECT decks.*, 
	(
		SELECT COUNT(*) 
		FROM cards 
		WHERE cards.deck_id = decks.id
    ) AS card_count,
	users.username
FROM decks
INNER JOIN users
ON users.id = decks.user_id
;