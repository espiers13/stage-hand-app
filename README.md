<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stage Hand — README</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0d1117;
      color: #e6edf3;
      padding: 48px 24px;
      line-height: 1.7;
    }

    .container {
      max-width: 860px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      border-bottom: 1px solid #30363d;
      padding-bottom: 32px;
      margin-bottom: 40px;
    }

    .header h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #f0f6fc;
      letter-spacing: -0.5px;
    }

    .header .subtitle {
      font-size: 1rem;
      color: #8b949e;
      margin-top: 6px;
    }

    /* Sections */
    h2 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #f0f6fc;
      border-bottom: 1px solid #30363d;
      padding-bottom: 10px;
      margin: 40px 0 16px;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #79c0ff;
      margin: 24px 0 10px;
    }

    p {
      color: #c9d1d9;
      margin-bottom: 12px;
    }

    /* Bullet lists */
    ul {
      list-style: none;
      padding: 0;
      margin-bottom: 12px;
    }

    ul li {
      color: #c9d1d9;
      padding: 4px 0 4px 20px;
      position: relative;
    }

    ul li::before {
      content: "›";
      position: absolute;
      left: 4px;
      color: #58a6ff;
      font-weight: bold;
    }

    ul li ul li::before {
      color: #8b949e;
    }

    ul li ul {
      margin-top: 4px;
    }

    /* Table */
    .table-wrap {
      overflow-x: auto;
      margin-bottom: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    thead tr {
      background: #161b22;
    }

    thead th {
      padding: 10px 14px;
      text-align: left;
      color: #8b949e;
      font-weight: 600;
      border-bottom: 1px solid #30363d;
      white-space: nowrap;
    }

    tbody tr {
      border-bottom: 1px solid #21262d;
    }

    tbody tr:hover {
      background: #161b22;
    }

    tbody td {
      padding: 9px 14px;
      color: #c9d1d9;
      vertical-align: middle;
    }

    /* Section label rows */
    .section-row td {
      background: #1c2128;
      color: #79c0ff;
      font-weight: 600;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 7px 14px;
    }

    /* Method badges */
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: "SF Mono", "Fira Code", monospace;
      letter-spacing: 0.03em;
    }

    .badge-get    { background: #1a4731; color: #3fb950; }
    .badge-post   { background: #1c3353; color: #58a6ff; }
    .badge-patch  { background: #3d2a00; color: #e3b341; }
    .badge-delete { background: #3d1a1a; color: #f85149; }

    code {
      font-family: "SF Mono", "Fira Code", monospace;
      font-size: 0.85em;
      color: #e6edf3;
      background: #161b22;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #30363d;
    }

    /* Tech stack grid */
    .stack-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin-top: 8px;
    }

    .stack-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 16px 18px;
    }

    .stack-card h4 {
      font-size: 0.8rem;
      font-weight: 600;
      color: #58a6ff;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      margin-bottom: 10px;
    }

    .stack-card ul li {
      font-size: 0.875rem;
      padding: 2px 0 2px 16px;
    }

    .stack-card ul li::before {
      color: #30363d;
      content: "–";
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <h1>Stage Hand App</h1>
      <p class="subtitle">Rehearsal Scheduling App</p>
    </div>

    <!-- Concept -->
    <h2>Concept</h2>
    <p>
      A tool for small theatre companies where a director or stage manager can create a production,
      add cast and crew members, set rehearsal slots, and mark who's called for each one.
      Cast members can log in and see their own schedule.
    </p>

    <!-- MVP -->
    <h2>Minimum Viable Product</h2>
    <ul>
      <li>Auth (register, login)</li>
      <li>Create a production</li>
      <li>Add rehearsals to a production</li>
      <li>Add cast members to a production</li>
      <li>Set cast members to specific rehearsals</li>
      <li>Cast members can view their own schedule</li>
    </ul>

    <!-- Data Model -->
    <h2>Data Model (Postgres)</h2>
    <ul>
      <li><code>users</code> — id, name, email, password_hash, role (admin / member)</li>
      <li><code>productions</code> — id, title, show_dates, created_by</li>
      <li><code>production_members</code> — joins users to productions by user_id (one user can be in multiple shows)</li>
      <li><code>rehearsals</code> — id, production_id, date, start_time, end_time, location, notes</li>
      <li><code>calls</code> — joins rehearsals to users; includes a <code>confirmed</code> boolean for cast to acknowledge their call</li>
    </ul>

    <!-- API Routes -->
    <h2>Backend API Routes</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Route</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>

          <tr class="section-row"><td colspan="3">Auth</td></tr>
          <tr><td><span class="badge badge-post">POST</span></td><td><code>/api/auth/register</code></td><td>Register a new user</td></tr>
          <tr><td><span class="badge badge-post">POST</span></td><td><code>/api/auth/login</code></td><td>Log in and receive a JWT</td></tr>
          <tr><td><span class="badge badge-get">GET</span></td><td><code>/api/auth/me</code></td><td>Get the currently authenticated user</td></tr>

          <tr class="section-row"><td colspan="3">Productions</td></tr>
          <tr><td><span class="badge badge-get">GET</span></td><td><code>/api/productions</code></td><td>All productions for the logged-in user</td></tr>
          <tr><td><span class="badge badge-post">POST</span></td><td><code>/api/productions</code></td><td>Create a new production (admin)</td></tr>
          <tr><td><span class="badge badge-get">GET</span></td><td><code>/api/productions/:id</code></td><td>Single production detail</td></tr>
          <tr><td><span class="badge badge-patch">PATCH</span></td><td><code>/api/productions/:id</code></td><td>Edit title or dates</td></tr>
          <tr><td><span class="badge badge-delete">DELETE</span></td><td><code>/api/productions/:id</code></td><td>Delete a production</td></tr>

          <tr class="section-row"><td colspan="3">Members</td></tr>
          <tr><td><span class="badge badge-get">GET</span></td><td><code>/api/productions/:id/members</code></td><td>Who is in this production</td></tr>
          <tr><td><span class="badge badge-post">POST</span></td><td><code>/api/productions/:id/members</code></td><td>Add a member by email</td></tr>
          <tr><td><span class="badge badge-delete">DELETE</span></td><td><code>/api/productions/:id/members/:userId</code></td><td>Remove a member</td></tr>

          <tr class="section-row"><td colspan="3">Rehearsals</td></tr>
          <tr><td><span class="badge badge-get">GET</span></td><td><code>/api/productions/:id/rehearsals</code></td><td>All rehearsals for a production</td></tr>
          <tr><td><span class="badge badge-post">POST</span></td><td><code>/api/productions/:id/rehearsals</code></td><td>Create a rehearsal slot</td></tr>
          <tr><td><span class="badge badge-patch">PATCH</span></td><td><code>/api/productions/:id/rehearsals/:rid</code></td><td>Edit time, location, or notes</td></tr>
          <tr><td><span class="badge badge-delete">DELETE</span></td><td><code>/api/productions/:id/rehearsals/:rid</code></td><td>Delete a rehearsal</td></tr>

          <tr class="section-row"><td colspan="3">Calls</td></tr>
          <tr><td><span class="badge badge-get">GET</span></td><td><code>/api/rehearsals/:id/calls</code></td><td>Who is called for this rehearsal</td></tr>
          <tr><td><span class="badge badge-post">POST</span></td><td><code>/api/rehearsals/:id/calls</code></td><td>Add a user to a rehearsal call</td></tr>
          <tr><td><span class="badge badge-delete">DELETE</span></td><td><code>/api/rehearsals/:id/calls/:userId</code></td><td>Remove someone from a call</td></tr>
          <tr><td><span class="badge badge-patch">PATCH</span></td><td><code>/api/rehearsals/:id/calls/:userId</code></td><td>Confirm or unconfirm attendance</td></tr>

          <tr class="section-row"><td colspan="3">User Schedule</td></tr>
          <tr><td><span class="badge badge-get">GET</span></td><td><code>/api/users/me/schedule</code></td><td>All rehearsals the logged-in user is called for</td></tr>

        </tbody>
      </table>
    </div>

    <!-- Frontend Structure -->
    <h2>Frontend Structure</h2>

    <h3>Pages</h3>
    <ul>
      <li><code>/login</code> and <code>/register</code></li>
      <li><code>/dashboard</code> — list of your productions (as admin or member)</li>
      <li><code>/productions/:id</code> — the main production page, with tabs or sections for:
        <ul>
          <li>Rehearsal schedule (list or calendar view)</li>
          <li>Cast &amp; crew list</li>
          <li>Production details</li>
        </ul>
      </li>
      <li><code>/productions/:id/rehearsals/new</code> — form to create a rehearsal</li>
      <li><code>/schedule</code> — personal view for cast members, just their own calls</li>
    </ul>

    <h3>Components</h3>
    <ul>
      <li><code>RehearsalCard</code> — shows date, time, location, who's called, notes</li>
      <li><code>CallList</code> — the list of called cast within a rehearsal, with confirm buttons</li>
      <li><code>ProductionMemberList</code> — manage who's in the show</li>
      <li><code>ScheduleCalendar</code> — optional weekly/monthly view using react-big-calendar or a custom grid</li>
    </ul>

    <!-- Tech Stack -->
    <h2>Tech Stack</h2>
    <div class="stack-grid">
      <div class="stack-card">
        <h4>Frontend</h4>
        <ul>
          <li>React (Vite)</li>
          <li>React Router</li>
          <li>Tailwind CSS</li>
          <li>Axios</li>
        </ul>
      </div>
      <div class="stack-card">
        <h4>Backend</h4>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>JWT (authentication)</li>
          <li>Bcrypt (password hashing)</li>
        </ul>
      </div>
      <div class="stack-card">
        <h4>Database</h4>
        <ul>
          <li>PostgreSQL</li>
          <li>node-postgres (pg)</li>
        </ul>
      </div>
      <div class="stack-card">
        <h4>Testing</h4>
        <ul>
          <li>Jest</li>
          <li>Supertest (backend)</li>
        </ul>
      </div>
      <div class="stack-card">
        <h4>Deployment</h4>
        <ul>
          <li>Vercel (frontend)</li>
          <li>Render (backend + database)</li>
        </ul>
      </div>
      <div class="stack-card">
        <h4>Version Control</h4>
        <ul>
          <li>Git / GitHub</li>
        </ul>
      </div>
    </div>

  </div>
</body>
</html>
