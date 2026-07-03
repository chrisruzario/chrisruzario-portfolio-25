"""Backend API tests for Contact endpoints - Chris Ruzario portfolio."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://data-insights-pro-59.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


class TestContact:
    def test_post_contact_persists(self, api_client):
        payload = {"name": "TEST_User", "email": "test_user@example.com",
                   "message": "TEST_ Hello Chris, this is an automated test."}
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert data["email_sent"] is False  # RESEND not configured - expected
        assert "id" in data and len(data["id"]) > 0
        assert "created_at" in data

        # Verify persistence via GET
        r2 = api_client.get(f"{BASE_URL}/api/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        assert any(item["id"] == data["id"] for item in items)
        # ensure no _id field leaked
        assert all("_id" not in item for item in items)

    def test_post_contact_invalid_email(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact",
                            json={"name": "X", "email": "not-an-email", "message": "hi"})
        assert r.status_code == 422

    def test_post_contact_missing_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={})
        assert r.status_code == 422
