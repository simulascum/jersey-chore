import * as THREE from 'three'

export interface UVIslandData {
  triToIsland: number[]
  triCount: number
  uvs: THREE.BufferAttribute
  index: THREE.BufferAttribute | null
}

/**
 * Group triangles into UV islands by traversing triangle adjacency via shared vertices.
 */
export function detectUVIslands(geometry: THREE.BufferGeometry): UVIslandData | null {
  const uvAttr = geometry.getAttribute('uv') as THREE.BufferAttribute | undefined
  if (!uvAttr) return null

  const indexAttr = geometry.getIndex()
  const triCount = indexAttr ? Math.floor(indexAttr.count / 3) : Math.floor(uvAttr.count / 3)

  const vertToTris = new Map<number, number[]>()
  for (let t = 0; t < triCount; t++) {
    for (let j = 0; j < 3; j++) {
      const vi = indexAttr ? indexAttr.getX(t * 3 + j) : t * 3 + j
      const tris = vertToTris.get(vi)
      if (tris) {
        tris.push(t)
      } else {
        vertToTris.set(vi, [t])
      }
    }
  }

  const triToIsland = Array<number>(triCount).fill(-1)
  let islandId = 0

  for (let start = 0; start < triCount; start++) {
    if (triToIsland[start] !== -1) continue

    const stack: number[] = [start]
    triToIsland[start] = islandId

    while (stack.length) {
      const t = stack.pop() as number
      for (let j = 0; j < 3; j++) {
        const vi = indexAttr ? indexAttr.getX(t * 3 + j) : t * 3 + j
        const connected = vertToTris.get(vi)
        if (!connected) continue

        for (const nt of connected) {
          if (triToIsland[nt] !== -1) continue
          triToIsland[nt] = islandId
          stack.push(nt)
        }
      }
    }

    islandId++
  }
//   console.log({
//     triToIsland,
//     triCount,
//     uvs: uvAttr,
//     index: indexAttr,
//   })
  return {
    triToIsland,
    triCount,
    uvs: uvAttr,
    index: indexAttr,
  }
}
