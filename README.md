An Image Search Abstraction Layer
=================================

Objective:
----------

- Build a full stack JavaScript app that allows to search for images like this: 
[https://daffy-pamphlet.glitch.me/api/imagesearch/lolcats%20funny?offset=10](https://daffy-pamphlet.glitch.me/api/imagesearch/lolcats%20funny?offset=10) 
- Browse recent search queries like this:
[https://daffy-pamphlet.glitch.me/api/latest/imagesearch](https://daffy-pamphlet.glitch.me/api/latest/imagesearch)

User Stories:
-------------
- Get the image URLs, snippets, thumbnails, and page URLs for a set of images relating to a given search string.
- Paginate through the responses by adding an `?offset=2` parameter to the URL.
- Get a list of the most recently submitted search strings.

[Front End](https://daffy-pamphlet.glitch.me/)