import pandas as pd
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from ..models.proposal import Proposal
from django.db.models import Q

# Mapping for validation status
VALIDATION_MAPPING = {
    "non conforme": ("declined", "Non-conformity detected"),
    "a verifier": ("to_review", "Needs verification"),
    "validée": ("accepted", "Validated successfully"),
    "manque de precision": ("to_review", "Lack of precision"),
    "deja existante": ("declined", "Already exists"),  # Ensure lowercase for consistency
}

# 1. Upload processed data to the database
@csrf_exempt
def upload_processed_file(request):
    if request.method == "POST":
        if "file" not in request.FILES:
            return JsonResponse({"error": "No file uploaded!"}, status=400)

        file = request.FILES["file"]

        try:
            # Step 1: Clear existing data in the database
            Proposal.objects.all().delete()

            # Step 2: Read the new CSV file
            df = pd.read_csv(file)

            # Step 3: Prepare new data for insertion
            proposals = []
            for _, row in df.iterrows():
                validation_status = str(row.get("validation de la proposition ", "")).strip().lower()
                status, reason = VALIDATION_MAPPING.get(validation_status, (None, None))

                proposals.append(
                    Proposal(
                        code_pro=row.get("code_pro", ""),
                        wilaya=row.get("wilaya", ""),
                        domaine=row.get("domaine", ""),
                        activity=row.get("activity", ""),
                        description=row.get("description", ""),
                        code_pro_processed=row.get("code_pro_processed", ""),
                        code_pro_language=row.get("code_pro_language", ""),
                        wilaya_processed=row.get("wilaya_processed", ""),
                        wilaya_language=row.get("wilaya_language", ""),
                        domaine_processed=row.get("domaine_processed", ""),
                        domaine_language=row.get("domaine_language", ""),
                        activity_processed=row.get("activity_processed", ""),
                        activity_language=row.get("activity_language", ""),
                        description_processed=row.get("description_processed", ""),
                        description_language=row.get("description_language", ""),
                        status_de_la_proposition=status,
                        raison_du_choix_du_status=reason,
                    )
                )

            # Step 4: Insert new data into the database
            Proposal.objects.bulk_create(proposals)

            return JsonResponse({"message": "File uploaded and data overridden successfully!"})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method!"}, status=400)

# 2. Calculate total redundant activities
def total_redundant_activities(request):
    total = Proposal.objects.filter(raison_du_choix_du_status__icontains="redundant").count()
    return JsonResponse({"total_redundant": total})

# 3. Calculate total declined activities
def total_declined_activities(request):
    total = Proposal.objects.filter(status_de_la_proposition__iexact="declined").count()
    return JsonResponse({"total_declined": total})

# 4. Calculate total activities to review
def total_to_review_activities(request):
    total = Proposal.objects.filter(status_de_la_proposition__iexact="to_review").count()
    return JsonResponse({"total_to_review": total})

# 5. Fetch and display all activities
def list_activities(request):
    activities = Proposal.objects.all().values()
    return JsonResponse(list(activities), safe=False)

# 6. Change status to accepted or declined
@csrf_exempt
def change_status(request, proposal_id, new_status):
    if request.method == 'POST':
        proposal = get_object_or_404(Proposal, id=proposal_id)
        if new_status.lower() not in ["accepted", "declined"]:
            return JsonResponse({"error": "Invalid status"}, status=400)
        
        proposal.status_de_la_proposition = new_status
        proposal.save()
        return JsonResponse({"message": f"Status updated to {new_status}"})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

# 7. Search activities based on redundancy, declined, or review status
def search_activities(request, status_type):
    if status_type.lower() == "redundant":
        activities = Proposal.objects.filter(raison_du_choix_du_status__icontains="redundant")
    elif status_type.lower() == "declined":
        activities = Proposal.objects.filter(status_de_la_proposition__iexact="declined")
    elif status_type.lower() == "to_review":
        activities = Proposal.objects.filter(status_de_la_proposition__iexact="to_review")
    else:
        return JsonResponse({"error": "Invalid search type"}, status=400)
    
    return JsonResponse(list(activities.values()), safe=False)

# Get details of a specific proposal by ID
def get_proposal_details(request, proposal_id):
    try:
        proposal = get_object_or_404(Proposal, id=proposal_id)
        
        # Convert proposal object to dictionary
        proposal_data = {
            'id': proposal_id,
            'code_pro': proposal.code_pro,
            'wilaya': proposal.wilaya,
            'domaine': proposal.domaine,
            'activity': proposal.activity,
            'description': proposal.description,
            'status_de_la_proposition': proposal.status_de_la_proposition,
            'raison_du_choix_du_status': proposal.raison_du_choix_du_status,
            # Add processed fields
            'code_pro_processed': proposal.code_pro_processed,
            'wilaya_processed': proposal.wilaya_processed,
            'domaine_processed': proposal.domaine_processed,
            'activity_processed': proposal.activity_processed,
            'description_processed': proposal.description_processed,
            # Add language fields
            'code_pro_language': proposal.code_pro_language,
            'wilaya_language': proposal.wilaya_language,
            'domaine_language': proposal.domaine_language,
            'activity_language': proposal.activity_language,
            'description_language': proposal.description_language,
        }
        
        return JsonResponse(proposal_data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def get_activities_by_type(request, filter_type):
    """Get all activities of a specific type (declined, to_review, redundant)"""
    try:
        if filter_type == 'redundant':
            activities = Proposal.objects.filter(
                raison_du_choix_du_status__icontains='redundant'
            ).values()
        else:
            activities = Proposal.objects.filter(
                status_de_la_proposition__iexact=filter_type
            ).values()
        
        return JsonResponse(list(activities), safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_adjacent_activities(request, proposal_id, filter_type):
    """Get previous and next activities of the same type"""
    try:
        current_activity = get_object_or_404(Proposal, id=proposal_id)
        
        # Define the filter based on type
        if filter_type == 'redundant':
            base_query = Q(raison_du_choix_du_status__icontains='redundant')
        else:
            base_query = Q(status_de_la_proposition__iexact=filter_type)
        
        # Get all IDs of the same type
        all_ids = list(Proposal.objects.filter(base_query).values_list('id', flat=True).order_by('id'))
        
        # Find current position
        current_index = all_ids.index(int(proposal_id))
        
        # Get previous and next IDs
        prev_id = all_ids[current_index - 1] if current_index > 0 else None
        next_id = all_ids[current_index + 1] if current_index < len(all_ids) - 1 else None
        
        return JsonResponse({
            'previous': prev_id,
            'next': next_id
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)