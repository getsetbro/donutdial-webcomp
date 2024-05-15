customElements.define("d3-donutdial",
  class extends HTMLElement {
    constructor() {
      super();
      const divElem = document.createElement("div");
      const shadowRoot = this.attachShadow({ mode: "open" });
      let textAttr = this.getAttribute("obj");
      if(!textAttr) return;
      let parsed = JSON.parse(textAttr);
      let obj = {...parsed,size: 200};

      let data = [obj.percent, 100 - obj.percent];
      let width = obj.size,
        height = obj.size,
        radius = Math.min(width, height) / 2;
      let pie = d3.layout.pie().sort(null);
      let arc = d3.svg
        .arc()
        .innerRadius(radius - obj.size / 7)
        .outerRadius(radius);

      let svg = d3
        .select(divElem)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMidYMid meet");

      let g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      g.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("fill", (d, i) => obj.colors[i])
        .attr("d", arc);

      g.append("text")
        .attr("fill", (d, i) => obj.colors[i])
        .attr("text-anchor", "middle")
        .attr("font-size", "2.3em")
        .attr("dy", ".2em")
        .text(obj.percent)
        .append("tspan")
        .text("%");
      if (obj.text) {
        g.append("text")
          .attr("fill", (d, i) => obj.colors[i])
          .attr("text-anchor", "middle")
          .attr("y", 28)
          .attr("font-weight", "bold")
          .text(obj.text.toUpperCase());
      }
      shadowRoot.appendChild(divElem);
    }
  }
);
