# Portfolio

Portfolio au format web présentant mon CV et mes projets personnels. Les différents articles concernant les projet sont
écris au format Markdown et sont ensuite convertis en HTML à l'aide
de [react-markdown](https://github.com/remarkjs/react-markdown). L'intérêt de cette méthode est de pouvoir écrire les
articles sans avoir à redéployer l'application à chaque modification.

***

### CI/CD

À l'aide des Github actions, à chaque push sur la branche `main`, le contenu statique (articles au format Markdown) est
automatiquement copié sur le serveur sans que le site ne soit redéployé.

***

### Conception

Le site est conçu avec [React](https://reactjs.org/) et [Vite.js](https://vitejs.dev/). Le code est écrit en TypeScript
et la librairie de composants utilisée est [shadcn](https://ui.shadcn.com). Cette dernière permet de n'avoir que les
composants nécessaire à l'application plutôt que l'entiereté de la librairie, ce qui permet de réduire la taille du
bundle.