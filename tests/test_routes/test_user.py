def test_create_user(client):
    data = {"email": "test2@gmail.com", "password": "pass123456"}
    response = client.post("/", json=data)
    assert response.status_code == 201
    assert response.json()["email"] == "test2@gmail.com"
    assert response.json()["is_active"] == True
