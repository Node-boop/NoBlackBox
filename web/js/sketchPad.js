class SketchPad{
    constructor(container,size=400){
        this.isDrawing = false
        this.paths = []
        this.canvas = document.createElement('canvas')

        this.canvas.width = size;
        this.canvas.height = size
        this.canvas.style = `
            background-color:white;
            box-shadow:0px 0px 10px 2px black;
        `;

        container.appendChild(this.canvas)

        this.context = this.canvas.getContext('2d')
        this.#addEventListeners()
    }
    #getMouse(event){
        const rectangle = this.canvas.getBoundingClientRect()

        return [
            Math.round(event.clientX-rectangle.left),
            Math.round(event.clientY-rectangle.top)
        ];

    }
    #addEventListeners(){
        this.canvas.onmousedown = (event)=>{
           const mouse = this.#getMouse(event)

            this.paths.push([mouse])
            this.isDrawing = true

        }
        this.canvas.onmousemove = (event)=>{
            if (this.isDrawing) {

                

                const mouse = this.#getMouse(event)
                const lastPath = this.paths[this.paths.length-1]

                lastPath.push(mouse)

                this.#redraw()
                
            } 
        };
        this.canvas.onmouseup = ()=>{
            this.isDrawing = false
        }
    };
    #redraw(){
        this.context.clearRect(0,0,
            this.canvas.width,this.canvas.height
        )
        draw.paths(this.context,this.paths);
    }

    
}