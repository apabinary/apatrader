define(["jquery","windows/windows","websockets/binary_websockets","lodash","datatables","jquery-growl","common/util"],function(a,b,c,d){"use strict";function e(b){require(["css!profittable/profitTable.css"]),require(["text!profittable/profitTable.html"]),b.click(function(){g?g.moveToTop():c.cached.authorize().then(f)["catch"](function(b){a.growl.error({message:b.message})})})}function f(){require(["text!profittable/profitTable.html"],function(c){g=b.createBlankWindow(a("<div/>"),{title:"Profit Table",width:700,minHeight:90,destroy:function(){h&&h.DataTable().destroy(!0),g=null},refresh:function(){i.clear(),l({clear:!0})},"data-authorized":"true"}),h=a(c),h.appendTo(g);var d=a("<div/>").addClass("profit-table-info");h=h.dataTable({data:[],columnDefs:[{targets:6,createdCell:function(b,c){var d=0>c?"red":c>0?"green":"bold";d&&a(b).addClass(d)}}],info:!1,footerCallback:function(){var a=this.api(),b=a.column(6).data().reduce(function(a,b){return 1*a+1*b},0),c="total "+(b>=0?"green":"red");d.html('<span class="title">Total Profit/Loss<span><span class="'+c+'">'+formatPrice(b)+"</span>")},paging:!1,ordering:!1,searching:!0,processing:!0}),d.appendTo(h.parent()),h.parent().addClass("hide-search-input"),h.api().columns().every(function(){var b=this;a("input",this.header()).on("keyup change",function(){b.search()!==this.value&&b.search(this.value).draw()})}),l({clear:!0}),i=g.addDateToHeader({title:"Jump to: ",date:null,changed:l,cleared:l}),g.dialog("open"),g.on("click",m),g.scroll(function(){var a=g.scrollTop(),b=g.innerHeight(),c=g[0].scrollHeight,d=(a+b)/c;d>.75&&!j&&!k&&l({clear:!1})})})}var g=null,h=null,i=null,j=!1,k=!1,l=function(b){var d=a("#"+h.attr("id")+"_processing").css("top","200px").show();j=!0;var e={profit_table:1,description:1,sort:"DESC"};if("string"==typeof b){e.date_from=yyyy_mm_dd_to_epoch(b,{utc:!0});var f=Date.UTC(1970,0,1,23,59,59)/1e3;e.date_to=e.date_from+f,h.api().rows().remove(),k=!0}else e.limit=50,(k||b.clear)&&(h.api().rows().remove(),k=!1),e.offset=h.api().column(0).data().length;var g=function(a){var b=a.profit_table&&a.profit_table.transactions||[],c=b.map(function(a){var b=(parseFloat(a.sell_price)-parseFloat(a.buy_price)).toFixed(2);return[epoch_to_string(a.purchase_time,{utc:!0}),a.transaction_id,a.longcode,a.buy_price,epoch_to_string(a.sell_time,{utc:!0}),a.sell_price,b,'<button class="green-button shine">View</button>',a]});h.api().rows.add(c),h.api().draw(),j=!1,d.hide()};c.send(e).then(g)["catch"](function(b){g({}),a.growl.error({message:b.message})})},m=function(b){var c=b.target,e=a(c);if("BUTTON"===c.tagName&&!e.hasClass("disabled")){var f=c.parentElement.parentElement,g=h.api().row(f).data();g=d.last(g),e.addClass("disabled"),require(["viewtransaction/viewTransaction"],function(a){a.init(g.contract_id,g.transaction_id).then(function(){e.removeClass("disabled")})})}};return{init:e}});