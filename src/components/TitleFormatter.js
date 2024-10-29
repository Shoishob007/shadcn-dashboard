export default function FormatTitle(path) {
    return path
        .split("/")
        .filter(Boolean)
        .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" > ");
};