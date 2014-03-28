YUI.add("moodle-mod_dialogue-autocomplete",function(e,t){M.mod_dialogue=M.mod_dialogue||{},M.mod_dialogue.autocomplete={SELECTORS:{CONTAINER:"#participant_autocomplete_field",INPUT:"#participant_autocomplete_input"},RESULTTEXTLOCATOR:"fullname",RESULTLISTLOCATOR:"results",containernode:null,inputnode:null,listnode:null,cmid:null,participants:null,init:function(t,n){this.cmid=t,this.participants=n,this.removeimageurl=M.util.image_url("remove","dialogue"),this.containernode=e.one(this.SELECTORS.CONTAINER),this.inputnode=e.one(this.SELECTORS.INPUT),this.listnode=e.Node.create('<ul id="'+e.guid()+'"></ul>'),this.inputnode.plug(e.Plugin.AutoComplete),this.inputnode.ac.set("resultHighlighter","phraseMatch"),this.inputnode.ac.set("source",M.cfg.wwwroot+"/mod/dialogue/searchpotentials.json.php?q={query}&id="+t+"&sesskey="+M.cfg.sesskey),this.inputnode.ac.set("resultTextLocator",this.RESULTTEXTLOCATOR),this.inputnode.ac.set("resultListLocator",this.RESULTLISTLOCATOR),this.inputnode.ac.set("resultFormatter",this.result_formatter),this.inputnode.ac.set("minQueryLength",0),this.inputnode.ac.set("maxResults",10),this.containernode.prepend(this.listnode),this.listfooter=e.Node.create('<div class="yui3-aclist-footer"></div>'),e.one(".yui3-aclist-content").append(this.listfooter);try{n=e.JSON.parse(n);for(var r in n)this.add_participant(n[r])}catch(i){}e.all(".nonjs-control").remove(),this.inputnode.ac.after("select",e.bind(this.handle_select,this)),this.containernode.one(".drop-down-arrow").on("click",e.bind(this.drop_the_list,this)),this.inputnode.on("key",e.bind(this.handle_backspace,this),"backspace"),this.inputnode.ac.on("results",e.bind(this.enforce_participant_limit,this)),this.inputnode.ac.on("results",e.bind(this.refresh_footer,this))},enforce_participant_limit:function(e){this.listnode.get("children").size()>=1&&(e.preventDefault(),e.stopPropagation())},refresh_footer:function(e){var t=e.data.matches<e.data.pagesize?e.data.matches:e.data.pagesize;this.listfooter.setHTML("<strong><small>Displaying 1-"+t+" of "+e.data.matches+"</small></strong>")},handle_select:function(e){var t=e.result.raw;this.add_participant(t),this.inputnode.set("value","")},add_participant:function(t){var n=this.make_participant_item(t);this.listnode.append(n),e.all("li div img.remove").on("click",e.bind(this.remove_participant_onclick,this)),this.containernode.toggleClass("force-safari-repaint")},remove_participant_onclick:function(t){var n=e.one(t.currentTarget).ancestor("li");n&&n.remove()},remove_last_participant:function(){var e=this.listnode.one("> li:last-of-type");e&&this.inputnode.get("value")===""&&e.remove()},handle_backspace:function(){this.remove_last_participant(),this.inputnode.focus()},drop_the_list:function(){this.inputnode.ac.sendRequest(""),this.inputnode.focus()},make_participant_item:function(t){var n='<li><div class="aclist-participant-item"><img src="{personimageurl}" alt="{personimagealt}" title="{personimagealt}" class="userpicture" /><span>{personfullname}</span><img class="remove" src="{removeimageurl}"/><input type="hidden" name="p[]" value="{personid}"/></div></li>';return e.Lang.sub(n,{personimageurl:t.imageurl,personimagealt:t.imagealt,personfullname:t.fullname,personid:t.id,removeimageurl:this.removeimageurl})},result_formatter:function(t,n){var r=e.Array.map(n,function(e){var t=e.raw;return'<div class=""><img src="'+t.imageurl+'" alt="'+t.imagealt+'" title="'+t.imagealt+'" class="userpicture" />'+'<span class="participant-name">'+e.highlighted+"</span>"+"</div>"});return r}}},"@VERSION@",{requires:["base","node","json-parse","autocomplete","autocomplete-filters","autocomplete-highlighters","event","event-key"]});