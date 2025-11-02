# Hotel Client

A Vite + React client for the `hotel-api` backend. Features:

- Public rooms listing
- Admin can add/edit/delete rooms (protected)
- Logged-in users can book and cancel bookings
- React Query, Axios, Redux Toolkit, Formik, Tailwind CSS, i18next

Assumptions:

- Backend runs at http://localhost:5000 and exposes these endpoints:
  - GET /api/rooms
  - GET /api/rooms/:id
  - POST /api/rooms (admin)
  - PUT /api/rooms/:id (admin)
  - DELETE /api/rooms/:id (admin)
  - POST /api/auth/login -> { token, user }
  - GET /api/bookings/my
  - POST /api/bookings
  - DELETE /api/bookings/:id

Install and run (Powershell):

```powershell
cd D:\Education\Freelancing\Destination_Bir\hotel-client
npm install
npm run dev
```

If your backend uses a different base URL/port, update `src/api/axios.js`.
