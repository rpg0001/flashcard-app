USE flashcard_app;

SELECT *, 
	(
		SELECT COUNT(*) 
		FROM cards 
		WHERE cards.deck_id = decks.id
    ) AS card_count
FROM decks
WHERE id = 1;