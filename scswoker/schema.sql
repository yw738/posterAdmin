CREATE TABLE IF NOT EXISTS sites (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    pid INTEGER NOT NULL, 
    name TEXT NOT NULL, 
    url TEXT, 
    img TEXT, 
    tips TEXT, 
    tags TEXT, 
    notes TEXT, 
    order_num INTEGER NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


