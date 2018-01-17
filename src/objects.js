export function add_ground(scene) {
    let loader = new THREE.ObjectLoader()
    loader.crossOrigin = ''

    let ground_url = 'https://cdn.aframe.io/link-traversal/models/ground.json'
    loader.load(ground_url, function (obj) {
        obj.children.forEach(function (value) {
            value.receiveShadow = true
            value.material.flatShading = THREE.FlatShading
        })
        scene.add(obj)
    })
}

export function add_sky(scene) {
    let geometry = new THREE.SphereGeometry(65)
    let material = new THREE.ShaderMaterial({
        uniforms: {
            colorTop: {value: new THREE.Color(0x353449)},
            colorBottom: {value: new THREE.Color(0xbc483e)}
        },
        side: THREE.BackSide,
        vertexShader: [
            'varying vec3 vWorldPosition;',

            'void main() {',
                'vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
                'vWorldPosition = worldPosition.xyz;',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            '}'
        ].join('\n'),
        fragmentShader: [
            'uniform vec3 colorTop;',
            'uniform vec3 colorBottom;',
            'varying vec3 vWorldPosition;',

            'void main()',
            '{',
                'vec3 pointOnSphere = normalize(vWorldPosition.xyz);',
                'float f = 1.0;',
                'if(pointOnSphere.y > - 0.2){',
                    'f = sin(pointOnSphere.y * 2.0);',
                '}',
                'gl_FragColor = vec4(mix(colorBottom,colorTop, f ), 1.0);',
            '}'
        ].join('\n'),
    })

    let sky = new THREE.Mesh(geometry, material)
    scene.add(sky)
}
