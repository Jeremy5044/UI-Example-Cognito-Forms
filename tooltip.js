let targetElm = null;
let tipDelay = 100; // 1000 = 1 sec

function _(elm) {
  return document.getElementById(elm);
}

function showTooltip(e) {
  e.stopPropagation();
  let tooltip = _("tooltip_container");
  let target = e.target;

  // Check if the button's text content is truncated
  if (target.offsetWidth < target.scrollWidth) {
    tooltip.style.left =
      e.pageX + tooltip.clientWidth + 10 < document.body.clientWidth
        ? e.pageX + 10 + "px"
        : document.body.clientWidth + 5 - tooltip.clientWidth + "px";
    tooltip.style.top =
      e.pageY + tooltip.clientHeight + 10 < document.body.clientHeight
        ? e.pageY + 0 + "px"
        : document.body.clientHeight + 20 - tooltip.clientHeight + "px";

    if (showTooltips == false) {
      setTimeout(delayedShowTooltip, tipDelay);
    }

    try {
      if (e.target.getAttribute("tooltip").length <= 0) {
        tooltip.classList.remove("visible_t");
      }
    } catch (e) {
      //--
      return;
    }

    tooltip.innerText = e.target.getAttribute("tooltip");
    showTooltips = true;
  }
}

let showTooltips = false;
function hideTooltip() {
  let tooltip = _("tooltip_container");
  tooltip.classList.remove("visible_t");
  showTooltips = false;
}

if (_("tooltip_container") == null) {
  let tpId = document.createElement("div");
  tpId.setAttribute("id", "tooltip_container");
  document.body.appendChild(tpId);
}

function delayedShowTooltip() {
  let tooltip = _("tooltip_container");
  if (showTooltips) {
    tooltip.classList.add("visible_t");
  }
}

function addToolTips() {
  let tooltips = document.querySelectorAll("[tooltip]");
  for (var i = 0; i < tooltips.length; i++) {
    tooltips[i].addEventListener("mousemove", showTooltip);
  }
  for (var i = 0; i < tooltips.length; i++) {
    tooltips[i].addEventListener("mouseleave", hideTooltip);
    tooltips[i].addEventListener("click", hideTooltip);
  }
}

//Call this to add or update tooltip boundings
addToolTips();
