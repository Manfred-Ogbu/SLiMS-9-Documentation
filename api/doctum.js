var Doctum = {
    treeJson: {"tree":{"l":0,"n":"","p":"","c":[{"l":1,"n":"[Global Namespace]","p":"[Global_Namespace]","c":[{"l":2,"n":"AltoRouter","p":"AltoRouter"},{"l":2,"n":"Content","p":"Content"},{"l":2,"n":"OAI_Web_Service","p":"OAI_Web_Service"},{"l":2,"n":"PHPWebSocket","p":"PHPWebSocket"},{"l":2,"n":"PHPlot","p":"PHPlot"},{"l":2,"n":"PHPlot_Data","p":"PHPlot_Data"},{"l":2,"n":"Router","p":"Router"},{"l":2,"n":"VideoStream","p":"VideoStream"},{"l":2,"n":"admin_logon","p":"admin_logon"},{"l":2,"n":"api","p":"api"},{"l":2,"n":"biblio_list","p":"biblio_list"},{"l":2,"n":"biblio_list_model","p":"biblio_list_model"},{"l":2,"n":"biblio_mongodb_result","p":"biblio_mongodb_result"},{"l":2,"n":"circapi","p":"circapi"},{"l":2,"n":"content_custom","p":"content_custom"},{"l":2,"n":"content_list","p":"content_list"},{"l":2,"n":"detail","p":"detail"},{"l":2,"n":"http_request","p":"http_request"},{"l":2,"n":"member_logon","p":"member_logon"},{"l":2,"n":"membershipApi","p":"membershipApi"},{"l":2,"n":"module","p":"module"},{"l":2,"n":"utility","p":"utility"}]},{"l":1,"n":"Minigalnano","p":"Minigalnano","c":[{"l":2,"n":"Thumb","p":"Minigalnano/Thumb"}]},{"l":1,"n":"SLiMS","p":"SLiMS","c":[{"l":2,"n":"Cache","p":"SLiMS/Cache","c":[{"l":3,"n":"Providers","p":"SLiMS/Cache/Providers","c":[{"l":4,"n":"Files","p":"SLiMS/Cache/Providers/Files"}]},{"l":3,"n":"Contract","p":"SLiMS/Cache/Contract"}]},{"l":2,"n":"Http","p":"SLiMS/Http","c":[{"l":3,"n":"ArrayAble","p":"SLiMS/Http/ArrayAble"},{"l":3,"n":"Client","p":"SLiMS/Http/Client"},{"l":3,"n":"Download","p":"SLiMS/Http/Download"},{"l":3,"n":"Utils","p":"SLiMS/Http/Utils"}]},{"l":2,"n":"Mail","p":"SLiMS/Mail","c":[{"l":3,"n":"Queue","p":"SLiMS/Mail/Queue"},{"l":3,"n":"TemplateContract","p":"SLiMS/Mail/TemplateContract"}]},{"l":2,"n":"Migration","p":"SLiMS/Migration","c":[{"l":3,"n":"Migration","p":"SLiMS/Migration/Migration"},{"l":3,"n":"Runner","p":"SLiMS/Migration/Runner"}]},{"l":2,"n":"SearchEngine","p":"SLiMS/SearchEngine","c":[{"l":3,"n":"Contract","p":"SLiMS/SearchEngine/Contract"},{"l":3,"n":"Criteria","p":"SLiMS/SearchEngine/Criteria"},{"l":3,"n":"DefaultEngine","p":"SLiMS/SearchEngine/DefaultEngine"},{"l":3,"n":"Engine","p":"SLiMS/SearchEngine/Engine"},{"l":3,"n":"SearchBiblioEngine","p":"SLiMS/SearchEngine/SearchBiblioEngine"},{"l":3,"n":"SearchFilter","p":"SLiMS/SearchEngine/SearchFilter"}]},{"l":2,"n":"Session","p":"SLiMS/Session","c":[{"l":3,"n":"Driver","p":"SLiMS/Session/Driver","c":[{"l":4,"n":"Contract","p":"SLiMS/Session/Driver/Contract"},{"l":4,"n":"Files","p":"SLiMS/Session/Driver/Files"}]},{"l":3,"n":"Factory","p":"SLiMS/Session/Factory"}]},{"l":2,"n":"Table","p":"SLiMS/Table","c":[{"l":3,"n":"Grammar","p":"SLiMS/Table/Grammar","c":[{"l":4,"n":"Mysql","p":"SLiMS/Table/Grammar/Mysql"}]},{"l":3,"n":"Blueprint","p":"SLiMS/Table/Blueprint"},{"l":3,"n":"Schema","p":"SLiMS/Table/Schema"},{"l":3,"n":"Utils","p":"SLiMS/Table/Utils"}]},{"l":2,"n":"AdvancedLogging","p":"SLiMS/AdvancedLogging"},{"l":2,"n":"AlLibrarian","p":"SLiMS/AlLibrarian"},{"l":2,"n":"Cache","p":"SLiMS/Cache"},{"l":2,"n":"Config","p":"SLiMS/Config"},{"l":2,"n":"Currency","p":"SLiMS/Currency"},{"l":2,"n":"DB","p":"SLiMS/DB"},{"l":2,"n":"GroupMenu","p":"SLiMS/GroupMenu"},{"l":2,"n":"GroupMenuOrder","p":"SLiMS/GroupMenuOrder"},{"l":2,"n":"Ip","p":"SLiMS/Ip"},{"l":2,"n":"Json","p":"SLiMS/Json"},{"l":2,"n":"Mail","p":"SLiMS/Mail"},{"l":2,"n":"Number","p":"SLiMS/Number"},{"l":2,"n":"Opac","p":"SLiMS/Opac"},{"l":2,"n":"Plugins","p":"SLiMS/Plugins"},{"l":2,"n":"Visitor","p":"SLiMS/Visitor"}]}]},"treeOpenLevel":2},
    /** @var boolean */
    treeLoaded: false,
    /** @var boolean */
    listenersRegistered: false,
    autoCompleteData: null,
    /** @var boolean */
    autoCompleteLoading: false,
    /** @var boolean */
    autoCompleteLoaded: false,
    /** @var string|null */
    rootPath: null,
    /** @var string|null */
    autoCompleteDataUrl: null,
    /** @var HTMLElement|null */
    doctumSearchAutoComplete: null,
    /** @var HTMLElement|null */
    doctumSearchAutoCompleteProgressBarContainer: null,
    /** @var HTMLElement|null */
    doctumSearchAutoCompleteProgressBar: null,
    /** @var number */
    doctumSearchAutoCompleteProgressBarPercent: 0,
    /** @var autoComplete|null */
    autoCompleteJS: null,
    querySearchSecurityRegex: /([^0-9a-zA-Z:\\\\_\s])/gi,
    buildTreeNode: function (treeNode, htmlNode, treeOpenLevel) {
        var ulNode = document.createElement('ul');
        for (var childKey in treeNode.c) {
            var child = treeNode.c[childKey];
            var liClass = document.createElement('li');
            var hasChildren = child.hasOwnProperty('c');
            var nodeSpecialName = (hasChildren ? 'namespace:' : 'class:') + child.p.replace(/\//g, '_');
            liClass.setAttribute('data-name', nodeSpecialName);

            // Create the node that will have the text
            var divHd = document.createElement('div');
            var levelCss = child.l - 1;
            divHd.className = hasChildren ? 'hd' : 'hd leaf';
            divHd.style.paddingLeft = (hasChildren ? (levelCss * 18) : (8 + (levelCss * 18))) + 'px';
            if (hasChildren) {
                if (child.l <= treeOpenLevel) {
                    liClass.className = 'opened';
                }
                var spanIcon = document.createElement('span');
                spanIcon.className = 'icon icon-play';
                divHd.appendChild(spanIcon);
            }
            var aLink = document.createElement('a');

            // Edit the HTML link to work correctly based on the current depth
            aLink.href = Doctum.rootPath + child.p + '.html';
            aLink.innerText = child.n;
            divHd.appendChild(aLink);
            liClass.appendChild(divHd);

            // It has children
            if (hasChildren) {
                var divBd = document.createElement('div');
                divBd.className = 'bd';
                Doctum.buildTreeNode(child, divBd, treeOpenLevel);
                liClass.appendChild(divBd);
            }
            ulNode.appendChild(liClass);
        }
        htmlNode.appendChild(ulNode);
    },
    initListeners: function () {
        if (Doctum.listenersRegistered) {
            // Quick exit, already registered
            return;
        }
                Doctum.listenersRegistered = true;
    },
    loadTree: function () {
        if (Doctum.treeLoaded) {
            // Quick exit, already registered
            return;
        }
        Doctum.rootPath = document.body.getAttribute('data-root-path');
        Doctum.buildTreeNode(Doctum.treeJson.tree, document.getElementById('api-tree'), Doctum.treeJson.treeOpenLevel);

        // Toggle left-nav divs on click
        $('#api-tree .hd span').on('click', function () {
            $(this).parent().parent().toggleClass('opened');
        });

        // Expand the parent namespaces of the current page.
        var expected = $('body').attr('data-name');

        if (expected) {
            // Open the currently selected node and its parents.
            var container = $('#api-tree');
            var node = $('#api-tree li[data-name="' + expected + '"]');
            // Node might not be found when simulating namespaces
            if (node.length > 0) {
                node.addClass('active').addClass('opened');
                node.parents('li').addClass('opened');
                var scrollPos = node.offset().top - container.offset().top + container.scrollTop();
                // Position the item nearer to the top of the screen.
                scrollPos -= 200;
                container.scrollTop(scrollPos);
            }
        }
        Doctum.treeLoaded = true;
    },
    pagePartiallyLoaded: function (event) {
        Doctum.initListeners();
        Doctum.loadTree();
        Doctum.loadAutoComplete();
    },
    pageFullyLoaded: function (event) {
        // it may not have received DOMContentLoaded event
        Doctum.initListeners();
        Doctum.loadTree();
        Doctum.loadAutoComplete();
        // Fire the event in the search page too
        if (typeof DoctumSearch === 'object') {
            DoctumSearch.pageFullyLoaded();
        }
    },
    loadAutoComplete: function () {
        if (Doctum.autoCompleteLoaded) {
            // Quick exit, already loaded
            return;
        }
        Doctum.autoCompleteDataUrl = document.body.getAttribute('data-search-index-url');
        Doctum.doctumSearchAutoComplete = document.getElementById('doctum-search-auto-complete');
        Doctum.doctumSearchAutoCompleteProgressBarContainer = document.getElementById('search-progress-bar-container');
        Doctum.doctumSearchAutoCompleteProgressBar = document.getElementById('search-progress-bar');
        if (Doctum.doctumSearchAutoComplete !== null) {
            // Wait for it to be loaded
            Doctum.doctumSearchAutoComplete.addEventListener('init', function (_) {
                Doctum.autoCompleteLoaded = true;
                Doctum.doctumSearchAutoComplete.addEventListener('selection', function (event) {
                    // Go to selection page
                    window.location = Doctum.rootPath + event.detail.selection.value.p;
                });
                Doctum.doctumSearchAutoComplete.addEventListener('navigate', function (event) {
                    // Set selection in text box
                    if (typeof event.detail.selection.value === 'object') {
                        Doctum.doctumSearchAutoComplete.value = event.detail.selection.value.n;
                    }
                });
                Doctum.doctumSearchAutoComplete.addEventListener('results', function (event) {
                    Doctum.markProgressFinished();
                });
            });
        }
        // Check if the lib is loaded
        if (typeof autoComplete === 'function') {
            Doctum.bootAutoComplete();
        }
    },
    markInProgress: function () {
            Doctum.doctumSearchAutoCompleteProgressBarContainer.className = 'search-bar';
            Doctum.doctumSearchAutoCompleteProgressBar.className = 'progress-bar indeterminate';
            if (typeof DoctumSearch === 'object' && DoctumSearch.pageFullyLoaded) {
                DoctumSearch.doctumSearchPageAutoCompleteProgressBarContainer.className = 'search-bar';
                DoctumSearch.doctumSearchPageAutoCompleteProgressBar.className = 'progress-bar indeterminate';
            }
    },
    markProgressFinished: function () {
        Doctum.doctumSearchAutoCompleteProgressBarContainer.className = 'search-bar hidden';
        Doctum.doctumSearchAutoCompleteProgressBar.className = 'progress-bar';
        if (typeof DoctumSearch === 'object' && DoctumSearch.pageFullyLoaded) {
            DoctumSearch.doctumSearchPageAutoCompleteProgressBarContainer.className = 'search-bar hidden';
            DoctumSearch.doctumSearchPageAutoCompleteProgressBar.className = 'progress-bar';
        }
    },
    makeProgess: function () {
        Doctum.makeProgressOnProgressBar(
            Doctum.doctumSearchAutoCompleteProgressBarPercent,
            Doctum.doctumSearchAutoCompleteProgressBar
        );
        if (typeof DoctumSearch === 'object' && DoctumSearch.pageFullyLoaded) {
            Doctum.makeProgressOnProgressBar(
                Doctum.doctumSearchAutoCompleteProgressBarPercent,
                DoctumSearch.doctumSearchPageAutoCompleteProgressBar
            );
        }
    },
    loadAutoCompleteData: function (query) {
        return new Promise(function (resolve, reject) {
            if (Doctum.autoCompleteData !== null) {
                resolve(Doctum.autoCompleteData);
                return;
            }
            Doctum.markInProgress();
            function reqListener() {
                Doctum.autoCompleteLoading = false;
                Doctum.autoCompleteData = JSON.parse(this.responseText).items;
                Doctum.markProgressFinished();

                setTimeout(function () {
                    resolve(Doctum.autoCompleteData);
                }, 50);// Let the UI render once before sending the results for processing. This gives time to the progress bar to hide
            }
            function reqError(err) {
                Doctum.autoCompleteLoading = false;
                Doctum.autoCompleteData = null;
                console.error(err);
                reject(err);
            }

            var oReq = new XMLHttpRequest();
            oReq.onload = reqListener;
            oReq.onerror = reqError;
            oReq.onprogress = function (pe) {
                if (pe.lengthComputable) {
                    Doctum.doctumSearchAutoCompleteProgressBarPercent = parseInt(pe.loaded / pe.total * 100, 10);
                    Doctum.makeProgess();
                }
            };
            oReq.onloadend = function (_) {
                Doctum.markProgressFinished();
            };
            oReq.open('get', Doctum.autoCompleteDataUrl, true);
            oReq.send();
        });
    },
    /**
     * Make some progress on a progress bar
     *
     * @param number percentage
     * @param HTMLElement progressBar
     * @return void
     */
    makeProgressOnProgressBar: function(percentage, progressBar) {
        progressBar.className = 'progress-bar';
        progressBar.style.width = percentage + '%';
        progressBar.setAttribute(
            'aria-valuenow', percentage
        );
    },
    searchEngine: function (query, record) {
        if (typeof query !== 'string') {
            return '';
        }
        // replace all (mode = g) spaces and non breaking spaces (\s) by pipes
        // g = global mode to mark also the second word searched
        // i = case insensitive
        // how this function works:
        // First: search if the query has the keywords in sequence
        // Second: replace the keywords by a mark and leave all the text in between non marked
        
        if (record.match(new RegExp('(' + query.replace(/\s/g, ').*(') + ')', 'gi')) === null) {
            return '';// Does not match
        }

        var replacedRecord = record.replace(new RegExp('(' + query.replace(/\s/g, '|') + ')', 'gi'), function (group) {
            return '<mark class="auto-complete-highlight">' + group + '</mark>';
        });

        if (replacedRecord !== record) {
            return replacedRecord;// This should not happen but just in case there was no match done
        }

        return '';
    },
    /**
     * Clean the search query
     *
     * @param string query
     * @return string
     */
    cleanSearchQuery: function (query) {
        // replace any chars that could lead to injecting code in our regex
        // remove start or end spaces
        // replace backslashes by an escaped version, use case in search: \myRootFunction
        return query.replace(Doctum.querySearchSecurityRegex, '').trim().replace(/\\/g, '\\\\');
    },
    bootAutoComplete: function () {
        Doctum.autoCompleteJS = new autoComplete(
            {
                selector: '#doctum-search-auto-complete',
                searchEngine: function (query, record) {
                    return Doctum.searchEngine(query, record);
                },
                submit: true,
                data: {
                    src: function (q) {
                        Doctum.markInProgress();
                        return Doctum.loadAutoCompleteData(q);
                    },
                    keys: ['n'],// Data 'Object' key to be searched
                    cache: false, // Is not compatible with async fetch of data
                },
                query: (input) => {
                    return Doctum.cleanSearchQuery(input);
                },
                trigger: (query) => {
                    return Doctum.cleanSearchQuery(query).length > 0;
                },
                resultsList: {
                    tag: 'ul',
                    class: 'auto-complete-dropdown-menu',
                    destination: '#auto-complete-results',
                    position: 'afterbegin',
                    maxResults: 500,
                    noResults: false,
                },
                resultItem: {
                    tag: 'li',
                    class: 'auto-complete-result',
                    highlight: 'auto-complete-highlight',
                    selected: 'auto-complete-selected'
                },
            }
        );
    }
};


document.addEventListener('DOMContentLoaded', Doctum.pagePartiallyLoaded, false);
window.addEventListener('load', Doctum.pageFullyLoaded, false);
