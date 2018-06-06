var currentId = null;
var qualifyingEvents = [
    {
        Id: '0000-0000-0000-0001',
        EventType: 'Marriage',
        Submitted: '11/12/2018',
        Comments: '',
        Notes: 'No comments yet.'
    },
    {
        Id: '0000-0000-0000-0001',
        EventType: 'Birth, adoption, or legal guardianship',
        Submitted: '11/12/2018',
        Comments: '',
        Notes: 'The letter you submitted regarding lost coverage needs to come from the insurance carrier. Please contact your previous carrier and request a letter showing coverage termination date and re-submit. Thanks!'
    },
    {
        Id: '0000-0000-0000-0001',
        EventType: 'Loss of other coverage',
        Submitted: '11/12/2018',
        Comments: '',
        Notes: 'No comments yet.'
    },
];

var descriptions = [
    "Sufficient documentation includes: (1) birth certificat; (2) hospital record; (3) adoption record or placement for adoption; (4) legal guardianship document; (5) court order or child support order",
    "Sufficient documentation includes: (1) marriage license",
    "Sufficient documentation includes: (1) death certificate",
    "Sufficient documentation includes: (1) divorce or annulment papers including the ending of health care responsibility",
    "Sufficient documentation includes: (1) letter or document from employer stating the employer changed, dropped or will drop coverage for the employee, spouse, or dependents, including the date coverage ended or will end;",
];

$(function () {
    $('#AddQualifyingEvent').on('click', function () {
        currentId = null;
        $('#EditQualifyingEvent input, #EditQualifyingEvent select, #EditQualifyingEvent textarea').val('');
        //$('select').select2()
        $('#EditQualifyingEvent [name="Id"]').val(guid());
        $('#EditQualifyingEvent [name="Submitted"]').val("11/12/2018);");
        $('#EditQualifyingEvent [name="Notes"]').val("No comments yet.");
        $('#EditQualifyingEvent').modal('show');
    });
    $('#SaveQualifyingEvent').on('click', function () {
        var qualifyingEvent = $('#EditQualifyingEvent form').serializeJSON();
        if (currentId) {
            var index = qualifyingEvents.findIndex((qualifyingEvent) => {
                return qualifyingEvent.Id === currentId;
            });
            qualifyingEvents[index] = qualifyingEvent;
        } else {
            qualifyingEvents.push(qualifyingEvent);
        }
        UpdateCards();
        $('#EditQualifyingEvent').modal('hide')
    });

    $('#RemoveQualifyingEvent').on('click', function () {
        var index = qualifyingEvents.findIndex((qualifyingEvent) => {
            return qualifyingEvent.Id === currentId;
        });
        if (index > -1) {
            qualifyingEvents.splice(index, 1);
            UpdateCards();
        }
        $('#ConfirmRemoveQualifyingEvent').modal('hide')
    });

    $('[name="EventType"]').on('change', function () {
        var index = $('[name="EventType"] option:selected').data().index;
        if (index > -1)
            $('#Description').text(descriptions[index]).toggleClass('hide', false);
        else
            $('#Description').text('').toggleClass('hide', true);
    });

    UpdateCards();

    $('select').select2({ placeholder: '' });

    $('.custom-file-input').on('change', function () {
        $('.custom-file-label').text($(this).val());
    });



});

function UpdateCards() {
    $('#QualifyingEvents').empty();
    var index = 0;
    var card = '';
    for (var qualifyingEvent of qualifyingEvents) {

        if (index === 0) {
            card += '<div class="row my-3 card-deck no-gutters">';
        }
        card +=
            ` 
            <div class="col-md-4">
                <div class="card mb-4 box-shadow position-relative" style="height: 100%">
                    <div class="card-body">
                        <div class="row no-gutters">
                            <div class="col-9">
                                <h5 class="card-title blue-header">${qualifyingEvent.EventType}</h5>
                            </div>
                            <div class="col-3">
                                <i  data-id="${qualifyingEvent.Id}" class="fa fa-trash-o fa-1x gray-label pull-right remove-qualifying-event"></i>
                            </div>
                        </div>
                        <div class="row no-gutters gray-label my-2">
                            <div class="col" style="display: flex">
                                <span>Submitted</span>
                                <span class="mx-2 dashed-middle">&nbsp;</span>
                            </div>
                            <div class="col">
                                ${qualifyingEvent.Submitted}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" style="display: flex">
                                <a href="/Content/Images/Marriage.jpg" target="_blank">  View supporting document</a>

   
                            </div>
                        </div>
                        <label class="gray-label my-2">Notes from employees</label>
                        <p class="mb-5">
                            ${qualifyingEvent.Comments}
                        </p>

                        <label class="gray-label my-2">Comments from WL</label>
                        <p class="mb-5">
                            ${qualifyingEvent.Notes}
                        </p>
                        <div class="row no-gutters mt-3 position-absolute" style="bottom: 20px;">
                            <div class="col yellow-verification">
                                <i class="fa fa-clock-o"></i> Verification pending
                            </div>
                            <div class="col-12">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

        if (index !== 0 && (index + 1) % 3 === 0) {
            card += '</div><div class="row my-3 card-deck no-gutters">';
        } else if (index === (qualifyingEvents.length - 1)) {
            card += '</div>'
        }
        index++;
    }
    $('#QualifyingEvents').append(card);


    $('.remove-qualifying-event').on('click', function () {
        currentId = $(this).data().id;
        $('#ConfirmRemoveQualifyingEvent').modal('show')
    });

    $('.edit-qualifyingEvent').on('click', function () {
        $('#EditQualifyingEvent form input, #EditQualifyingEvent form select').val('');

        currentId = $(this).data().id;
        var qualifyingEvent = qualifyingEvents.find((qualifyingEvent) => {
            return qualifyingEvent.Id === currentId;
        });
        $('#EditQualifyingEvent [name="EventType"]').val(qualifyingEvent.EventType);
        $('#EditQualifyingEvent [name="Submitted"]').val(qualifyingEvent.Submitted);
        $('#EditQualifyingEvent [name="Comments"]').val(qualifyingEvent.Comments);

        $('#EditQualifyingEvent').modal('show');
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

