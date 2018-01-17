import './polyfills'
import * as ui from './ui'
import * as objects from './objects'
import * as camera_path from './camera_path'

let waypoints = [
    {color: 0x2020f0,
     position: new THREE.Vector3(-3, 1, 2),
     lookat: new THREE.Vector3(3, 2, 4)},
    {color: 0x00f0f0,
     position: new THREE.Vector3(3, 2, 4),
     lookat: new THREE.Vector3(-2, 0.5, -2)},
    {color: 0xf00000,
     position: new THREE.Vector3(-2, 0.5, -2),
     lookat: new THREE.Vector3(-3, 1, 0)},
]

var renderer = null
var camera = null
var scene = null
var cube = null
var prev_timestamp = 0
var camera_moving = false

function init() {
    // ---------- initialize scene, camera and renderer ----------
    let width = window.innerWidth
    let height = window.innerHeight

    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xbc483e, 0, 65)
    camera = new THREE.PerspectiveCamera(
        75, width / height, 0.1, 1000)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize( width, height )
    document.body.appendChild( renderer.domElement )
    window.on('resize', on_resize)

    // ---------- fill scene with objects----------
    let geometry = new THREE.BoxGeometry(1, 1, 1)
    waypoints.forEach( (el, i) => {
        let mat = new THREE.MeshPhongMaterial({color: waypoints[i].color})
        let cube = new THREE.Mesh(geometry, mat)
        cube.position.copy(waypoints[i].position)
        scene.add(cube)
    })
    camera.position.copy(waypoints[0].position)
    camera.position.y += 1
    camera.lookAt(waypoints[0].lookat)
    change_waypoint(0)

    let light1 = new THREE.PointLight(0xf4f4f4, 0.2, 0)
    light1.position.set(8, 10, 18)
    let light2 = new THREE.PointLight(0xf4f4f4, 0.6, 0)
    light2.position.set(-8, 10, -18)
    let light_ambient = new THREE.AmbientLight(0xf4f4f4, 0.4)

    scene.add(light1)
    scene.add(light2)
    scene.add(light_ambient)

    objects.add_ground(scene)
    objects.add_sky(scene)
}

function on_resize() {
    let width = window.innerWidth
    let height = window.innerHeight
    let aspect = width / height

    renderer.setSize( width, height )

    camera.aspect = aspect
    camera.updateProjectionMatrix()
}

function render_loop(timestamp) {
    requestAnimationFrame(render_loop)

    let dt = timestamp - prev_timestamp
    prev_timestamp = timestamp

    if (camera_moving) {
        camera_moving = camera_path.continue_move(camera, dt)
    }

    renderer.render(scene, camera)
}

function change_waypoint(i) {
    camera_path.start_move(camera,
        waypoints[i].position, waypoints[i].lookat, 2000)
    camera_moving = true
}

// check webgl support. If not supported, show error message, otherwise init
try {
    let canvas = document.createElement('canvas')
    let webgl_support = !! window.WebGLRenderingContext && (
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    if (!webgl_support) {
        throw "NO_WEBGL"
    }

    init()
    ui.init(change_waypoint)
    prev_timestamp = performance.now()
    render_loop(prev_timestamp)

} catch (e) {
    ui.hide_ui()
    if (e == "NO_WEBGL") {
        ui.show_webgl_error()
    } else {
        ui.show_generic_error()
    }
    throw e
}
