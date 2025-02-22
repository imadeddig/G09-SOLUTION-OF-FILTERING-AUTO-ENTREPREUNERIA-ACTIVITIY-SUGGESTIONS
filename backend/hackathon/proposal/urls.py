from django.urls import path
from .views import proposal

urlpatterns = [
    path("upload/", proposal.upload_processed_file, name="upload_file"),
    path("total-redundant/", proposal.total_redundant_activities, name="total_redundant"),
    path("total-declined/", proposal.total_declined_activities, name="total_declined"),
    path("total-to-review/", proposal.total_to_review_activities, name="total_to_review"),
    path("activities/", proposal.list_activities, name="list_activities"),
    path('change-status/<int:proposal_id>/<str:new_status>/', proposal.change_status, name='change_status'),
    path("search/<str:status_type>/", proposal.search_activities, name="search_activities"),
    path('activities-by-type/<str:filter_type>/', proposal.get_activities_by_type),
    path('activity-details/<int:proposal_id>', proposal.get_proposal_details),
    path('adjacent-activities/<int:proposal_id>/<str:filter_type>/', proposal.get_adjacent_activities),
]