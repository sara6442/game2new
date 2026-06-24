"""
remove_bg.py — Remove the white background from body.png.

Strategy: BFS flood-fill from all 4 edges. Any pixel that is reachable
from an edge through "near-white" pixels becomes transparent.

This preserves the white bandeau top, because it's an isolated white
region surrounded by skin tone (not connected to the edge).
"""

from PIL import Image
from collections import deque

SRC = '/home/z/my-project/public/body.png'
DST = '/home/z/my-project/public/body.png'

# Tolerance for "near-white" — pixels within this Manhattan distance
# from pure white (255,255,255) are considered background.
TOLERANCE = 18

def is_near_white(rgb):
    r, g, b = rgb[0], rgb[1], rgb[2]
    return (255 - r) + (255 - g) + (255 - b) <= TOLERANCE * 3

def main():
    img = Image.open(SRC).convert('RGBA')
    w, h = img.size
    pixels = img.load()

    # Start BFS from all edge pixels that are near-white
    visited = [[False] * h for _ in range(w)]
    queue = deque()

    for x in range(w):
        for y in [0, h - 1]:
            if is_near_white(pixels[x, y]) and not visited[x][y]:
                visited[x][y] = True
                queue.append((x, y))
    for y in range(h):
        for x in [0, w - 1]:
            if is_near_white(pixels[x, y]) and not visited[x][y]:
                visited[x][y] = True
                queue.append((x, y))

    # BFS through near-white neighbors
    while queue:
        x, y = queue.popleft()
        # Make this pixel fully transparent
        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        # Visit neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                if is_near_white(pixels[nx, ny]):
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    # Anti-alias edges. For pixels that are very light and have a transparent
    # neighbor, reduce their alpha to smooth the silhouette edge.
    for x in range(w):
        for y in range(h):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            lightness = (r + g + b) / 3
            if lightness > 230:
                has_transparent_neighbor = False
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        if pixels[nx, ny][3] == 0:
                            has_transparent_neighbor = True
                            break
                if has_transparent_neighbor:
                    blend = (lightness - 230) / 25
                    new_alpha = int(a * (1 - blend * 0.6))
                    pixels[x, y] = (r, g, b, new_alpha)

    img.save(DST)
    print(f'Saved {DST} ({w}x{h})')

if __name__ == '__main__':
    main()
