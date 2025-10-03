## 💡 Full-stack Demoülesanne: Projektide Jälgimise Süsteem (Project Tracker)

Loo lihtne, kuid funktsionaalne **Projektide Jälgimise Rakendus**, mis võimaldab kasutajal hallata projekte ja nendega seotud ülesandeid (taske). See ülesanne näitab sinu kiiret õppimisvõimet ja arusaama kaasaegsest täis-virna arendusest.

### ⚙️ Nõutud Tehnoloogiad

* **Backend:** **Java 21 LTS** ja **Spring Boot** (REST API loomiseks).
* **Frontend:** **ReactJS** (kasuta funktsionaalseid komponente ja Hooks'e).
* **Andmebaas:** **PostgreSQL** (käivitatakse Dockeris).
* **Infrastruktuur:** **Docker** ja **Docker Compose**.

---

## 🎯 Ülesande Detailid

### 1. Backend: Spring Boot API

Loo **REST API** kahe andmemudeliga: **Project** (Projekt) ja **Task** (Ülesanne).

#### Entiteedid

1.  **Project** (Projekt)
    * `id` (Primary Key)
    * `name` (Projekti nimi)
    * `description` (Lühikirjeldus)
    * `startDate` (Alguskuupäev)
    * `endDate` (Eeldatav lõppkuupäev, võib olla `null`)
    * **Seos:** Ühel Projektil on mitu Ülesannet (One-to-Many).
2.  **Task** (Ülesanne)
    * `id` (Primary Key)
    * `title` (Ülesande pealkiri)
    * `description`
    * `status` (Olek: nt. `TODO`, `IN_PROGRESS`, `DONE`)
    * `dueDate` (Tähtaeg)
    * `projectId` (Foreign Key Projekti külge)

#### API Lõpp-punktid (Endpoints)

Implementeeri järgmised CRUD operatsioonid **Spring Data JPA** abil:

* **Projektid:**
    * `GET /api/projects`: Loe kõik projektid.
    * `POST /api/projects`: Loo uus projekt.
    * `GET /api/projects/{id}`: Loe üks projekt koos sellega seotud ülesannetega.
* **Ülesanded:**
    * `POST /api/tasks`: Loo uus ülesanne (seosta `projectId` abil).
    * `PUT /api/tasks/{id}/status`: Muuda ülesande olekut.

---

### 2. Frontend: ReactJS Kasutajaliides

Loo **Reacti rakendus**, mis suhtleb Spring Boot API-ga.

#### Funktsionaalsus

1.  **Projektide Nimekiri (Project List)**
    * Näita tabeli/nimekirjana kõiki projekte.
    * Võimalda navigeerida projekti detailvaatesse.
2.  **Projekti Detailvaade (Project Details)**
    * Kuva projekti detailne info.
    * Näita projekti **kõigi ülesannete nimekirja**.
    * Võimalus **lisada uus ülesanne** sellele projektile.
    * Võimalus muuta ülesande olekut (`status`) (nt. rippmenüü või nupu abil).

*Märkus: Keskendu funktsionaalsusele, mitte keerukale disainile. Andmeside ja kasutajakogemus olgu sujuv.*

---

### 3. Infrastruktuur: Docker ja Dokumentatsioon

Loo terviklahendus, mis on lihtsalt käivitatav ja jagatav.

1.  **Dockerfailid:**
    * Loo optimeeritud `Dockerfile` Spring Booti backend'i jaoks.
    * Loo `Dockerfile` Reacti frontend'i jaoks.
2.  **Docker Compose:**
    * Loo `docker-compose.yml` fail, mis käivitab **kolm teenust**: Spring Boot, React ja PostgreSQL (kasuta `volume`'eid).
3.  **`README.md` fail:**
    * Loo selge `README.md` fail, mis sisaldab **juhendit**, kuidas kogu virn lokaalselt **ühe käsuga** (`docker compose up -d`) käivitada.

---
---

*Antud ülesanne on genereeritud Gemini AI poolt eesmärgiga luua realistlik full-stack arendusprojekt, mis demonstreerib kiire õppimise ja uute tehnoloogiate (Java, Spring Boot, React) omandamise oskust.*