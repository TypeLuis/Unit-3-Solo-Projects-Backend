# Unit-3-Solo-Projects-Backend

What is fs?

    File System (fs) is a built in module in node js

    helps us store, access, and manage data on our operating system

    useful functions:

        const fileStream = fs.createReadStream(`${FILE-DIRECTORY/test.jpg`)

            -createReadStream allows us to stream our file

        fileStream.on('open', () => {
            res.attachment('Kamina.jpg')
            fileStream.pipe(res)
        })

        fileStream.on('error', err => {
            next(err)
        })

What I learned:

Sources:
https://www.youtube.com/watch?v=cIjMBzGvrCY

https://www.youtube.com/watch?v=jAJzji5UxnU

- how

sources: https://attacomsian.com/blog/nodejs-create-directory

// 'fs' has to be imported //
fs.mkdir(dir, (err) => {}) is how you create a folder in node.js
