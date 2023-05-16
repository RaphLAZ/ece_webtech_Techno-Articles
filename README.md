# Project Techno Articles🚀

*Project as part of the web technologies course at the ECE School of Engineering*

The project is called "Techno Articles" and is a simple web application that allows users to create an account, create blog articles, and leave comments on other users' blog articles. 

## How it works🔧

The project is built using the following technologies:

- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js
- Database: PostgreSQL
- Authentication: Supabase

## Functionality💻

The project has the following main features:

1. User authentication: users can create an account and log in to the application. Authentication is handled by Supabase, and users also have the option to authenticate with their Github account.
2. User profiles: users can view their own profiles, edit their own profiles.
3. Blog articles: users can create blog articles, edit their own blog articles, and delete their own blog articles.
4. Comments: users can leave comments on other users' blog articles, edit their own comments, and delete their own comments.

## Database schema🗂️

The project uses a PostgreSQL database with the following schema:

- `users`: contains information about the application's users, including their email address, password (stored securely using bcrypt), and profile information.

```SQL
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    country TEXT,
    job TEXT
);
```

- `articles`: contains information about the blog articles, including the post title, content, and author information.

```SQL
CREATE TABLE articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE
);
```

*Function uuid_generate_v4() sets the default value of the id column to a newly generated UUID value.*

- `comments`: contains information about the comments on the blog articles, including the comment content, author information, and the post the comment was made on.

```SQL
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);
```

*Function uuid_generate_v4() sets the default value of the id column to a newly generated UUID value.*

- `contactrequest`: contains the data from the contact form that everyone can input data. Authenticated users as well as unauthenticated users of the blog.

```SQL
CREATE TABLE contactrequest (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

*Function uuid_generate_v4() sets the default value of the id column to a newly generated UUID value.*

*`created_at` column allows the admin to retrieve the oldest contact requests by sorting the table based on the created_at column in ascending order.*

### Triggers and functions🔄

We've added triggers to our database for several needs.

- 👉This trigger function is executed automatically after a new row is inserted into the "auth.users" table. The function inserts a new row into the "public.users" table with the same "id" and "email" as the new row in "auth.users" and then returns the new row.

```SQL
CREATE FUNCTION public.handle_new_user()
returns trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  return new;
END;
$$ language plpgsql security definer;

CREATE TRIGGER on_auth_user_created
  after insert ON auth.users
  for each row execute procedure public.handle_new_user();
```

*The different functions and triggers were found on different blogs like STackOverFlow, SupabaseDocs and reused for our project.*

## Security🛡️

Security is a top priority for this project, and we've implemented several measures to ensure that user data is protected. Supabase, the backend service used for this project, integrates with Row-Level Security (RLS) policies, which allows us to define rules that restrict access to certain rows in the database based on user roles and permissions.

In the `users` table, we've set up the following RLS policies:

- `profile_visible_by_creator` - restricts access to user profile so that only the user who created the profile can view it.

```SQL
CREATE POLICY profile_visible_by_creator
ON users
FOR SELECT
USING (auth.uid() = id);
```

- `update_own_profile` - allows users to update their own profile, but not the profiles of other users.

```SQL
CREATE POLICY update_own_profile
ON users 
FOR UPDATE
USING (auth.uid() = id);
```

In the `articles` table, we've set up the following RLS policies:

- `delete_own_post` - allows individuals to delete their own articles.

```SQL
CREATE POLICY delete_own_articles
ON articles 
FOR DELETE
USING (auth.uid() = id);
```

- `update_own_post` - allows individuals to update their own articles.

```SQL
CREATE POLICY update_own_post
ON articles 
FOR UPDATE
USING (auth.uid() = id);
```

- `authenticated_insert` - restricts insertions into the table to authenticated users only.

```SQL
CREATE POLICY authenticated_insert
ON articles 
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);
```

- `articles_are_public` - allows everybody to see the articles.

```SQL
CREATE POLICY public_articles
ON articles 
FOR SELECT
USING (true);
```

In the `comments` table, we've set up the following RLS policies:

- `public_comments` - allows comments to be visible to all users.

```SQL
CREATE POLICY public_comments
ON comments 
FOR SELECT
USING (true);
```

- `insert_comments` - allows authenticated/unauthenticated users to insert comment on a post.

```SQL
CREATE POLICY insert_comments
ON comments 
FOR INSERT
WITH CHECK (true);
```

- `delete_own_comment` - allows individuals to delete their own comments.

```SQL
CREATE POLICY delete_own_comments
ON comments 
FOR DELETE
USING (auth.uid() = user_id);
```

Finally, in the `contactrequest` table, we've allowed everyone to insert a contact request.

- `insert_contact_request` - allows everyone to insert a contact request even if they are not authenticated.

```SQL
CREATE POLICY insert_contact_request
ON contactrequest 
FOR INSERT
WITH CHECK (true);
```

By using RLS policies, we can ensure that only authorized users can access and modify data in the database, protecting user privacy and security.

## Development🛠️

### Prerequisites⚠️

Before installing and running the front-end and back-end applications, make sure you have the following prerequisites installed on your computer:

- Node.js and npm
- Docker for the back-end application

### Configuration Steps🔧

To install and run the front-end application, you need to have Node.js and npm installed on your computer.

1. To start the front-end application, open your terminal, navigate to the client directory and run the following command to install dependencies:

    ```bash
    npm install
    ```

2. After the dependencies have been installed, run the following command to start the front-end application:

    ```bash
    npm start
    ```
3. Open your web browser  and go to http://localhost:3000 to see the front-end application.

To install and run the back-end application, you need to have Docker installed on your computer.

1. Navigate to the backend directory and run the following command to start the back-end application:

    ```bash
    docker-compose -f ./docker-compose.yml -f ./dev/docker-compose.dev.yml up
    ```

2. Open your web browser and go to http://localhost:3001 to see the back-end application.

This command will start the back-end server and any necessary services.

## Production🚀

The project has been deployed to :

- Front-end: Vercel as a cloud platform that hosts the front-end of our project. It specializes in static and serverless sites.

- Back-end: SupaBase as a Backend-as-a-Service (BaaS) platform that provides tools to build the back-end of our project to avoid having to manage server infrastructure.

* Vercel URL: <https://ece-webtech-gr02-04.vercel.app/>
* Supabase project URL: <https://app.supabase.com/project/kjxediceuguygzntixdx>

## Tasks

### Project management

* **Naming convention**  
  - ✅ Task completed 2/2 : *Project was done by both authors during classes and commits was done on GitHub once build didn't have any errors on local test device.*
* **Project structure**
  - ✅ Task completed 2/2 : *Project is respecting the structure and organization of a React application. Same one as the one used during  the classes. `app` folder has the React application code and `supabase` folder has the Development Docker files and necessary file to start supabase with Docker on local device.*
* **Git**  
  - ✅ Task completed 1/2 : *Some weakness on usage of branches and git features. But good presence of history that allows to find older versions of the project*
* **Code quality**  
  - ✅ Task completed 1/2 : *We did the best on indentation of code, understandability using variables names that makes sense. Probably need more comments to the code even if code is comprehensible with the structure and variables names used.*
* **Design, UX, and content**  
  - ✅ Task completed 3/4 : *Design is good. Overlook of code as well. Tailwind was properly used. User experience could been better by adding possibility to the user to add pictures for articles.* 

### Application development

* **Home page**  
  - ✅ Task completed 2/2 : *Website is informative and friendly for a good experience for each user. All pages shows some relevant information like on well-known websites. User can send a contact message to administrators of the website. An about page is visible to present quickly the authors of the project. All the pages are accessible from header visible in the hole website. Navigation is possible between all pages thanks to the navigation bar. Home page is the `pages/index.js` file, files for navigation are `components/Header.js`, `components/Footer.js` and `components/Layout.js` as well as the `header` folder in the folder components. About and Contact pages are located in the folder pages.*
* **Login and profile page**  
  - ✅ Task completed 4/4 : *Login/Logout button present in the header. when user clicks on login it sends him to the login page and when clicking on logout sends him the home page and logs him out. User authenticated information is persisted in React context thanks to UserContext.js code. His name displays on the home page and in the logout button in the header. User can create an account with either email or with his GitHub account. Same possibility for signing in when suer already has an account. User has the possibility  to see/modify his personal information in the pages/userinfo.js code. By default, when user signs up, no information apart from his email is completed in the database. Cof for this feature is at the `pages/login.js`*
* **New post creation**  
  - ✅ Task completed 6/6 : *Code for adding an article is visible at `pages/newarticle.js`. Button for adding a new article is visible on the all articles page, code for this page is `allarticles.js`.  User can set title and description of article. (His name is automatically set with his personal information). A cancel button is available if user decides to not create article anymore. Once the user clicks on `add new article`, the article is persisted in database.*
* **New comment creation**  
  - ✅ Task completed 4/4 : *Everyone can add comments to articles. Name of the user is automatically added with his login personal information. If the user is not log in, his name will be put at "Anonymous". Comments are persisted in database. Code for this feature is visible at `components/CommentForm.js`.*
* **Resource access control**  
  - ✅ Task completed 6/6 : *RLS policies are added to database. The RLS policies used for the project are visible if you go to the Security paragraph. Only authenticated users can create posts. A user must only gain access to the posts or comments he created. Unauthenticated users can only read posts and post comments.*
* **Post modification and removal**  
  - ✅ Task completed 4/4 : *"edit" and "delete" buttons are visible on article page only if the login user is the one that created the article. Code for editing article is `modifyarticle/[id].js`.*
* **Comment modification and removal**  
  - ✅ Task completed 4/4 : *"edit" and "delete" buttons are visible on the Comment only if the login user is the one that created the comment. Cor for editing comment is at `editcomment/[id].js`.*
* **Account settings**  
  - ✅ Task completed 4/4 : *User can modify his/her personal information settings. We are using 4 different form of components. A combobox, a date picker, radio buttons and a text input. Code for this page is at `pages/userinfo.js`.*
* **Search**  
  - ✅ Task completed 6/6 : *When user types a word in the search bar, the application will look for all articles where the word is present either in the description or in the title of the article. The page that displays the articles of the search in the database is at `pages/searchresult.js`.*
* **WYSIWYG integration**  
  - ❌ Task not completed 0/2 : *Didn't have enough time to implement this feature.*
* **Gravatar integration**  
  - ❌ Task not completed 0/2 : *Didn't have enough time to implement this feature.*
* **Light/dark theme**  
  - ❌ Task not completed 0/2 : *Didn't have enough time to implement this feature.*
* **Theme selection**  
  - ❌ Task not completed 0/4 : *Didn't have enough time to implement this feature.*
  
Total: 49 = 16.33/20

## About the Authors👨‍💻

The website was developed by Raphael LAZZARI-ARMOUR and Axel PAPE.

## Thanks and Recognition

Special thanks to Paul FARAULT and David WORMS both engineers from the company ADALTAS who taught us the subject of web technologies. 

* ❌ I do not agree to allow my project to be used anonymously as an example for future students.


