function toggleTheme() {
    const root = document.documentElement;
    const darkIcons = Array.from(document.getElementsByClassName('dark'));
    const lightIcons = Array.from(document.getElementsByClassName('light'));
    if (root.classList.contains('day')) {
        root.classList.remove('day');
        root.classList.add('night');
        darkIcons.forEach(icon => icon.classList.remove('hidden'));
        lightIcons.forEach(icon => icon.classList.add('hidden'));
    } else {
        root.classList.remove('night');
        root.classList.add('day');
        darkIcons.forEach(icon => icon.classList.add('hidden'));
        lightIcons.forEach(icon => icon.classList.remove('hidden'));
    }
}

export default toggleTheme;