import { collection, getDocs, getDoc, doc, setDoc, addDoc } from 'firebase/firestore/lite'
import firebase from "../config/db";

class EntityService {
    private collection: string;

    constructor(colName: string){
        this.collection = colName;
    }

    setCollection(collection: string){
        this.collection = collection;
    }

    async findAll(){
        const entityCol = collection(firebase.db, this.collection);
        const entitySnapshot = await getDocs(entityCol);
        const entityList = entitySnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
        return entityList;
    }

    async findById(id: string){
        const entityRef = doc(firebase.db, this.collection, id);
        const entitySnapshot = await getDoc(entityRef);

        if (entitySnapshot.exists()) {
            const entityData = entitySnapshot.data();
            return entityData;
        }

        return undefined;
    }

    async save(id: string, data: any){

        if(id && Object.keys(data).length === 0){
           const entityRef = doc(firebase.db, this.collection, id);
           await setDoc(entityRef, data);
           return entityRef;
        }

        const entityRef = doc(firebase.db, this.collection, id);
        const userSnapshot = await getDoc(entityRef);
        console.log(userSnapshot.exists());

        if (userSnapshot.exists()) {
            console.log(data);
            const penaltiesCollectionRef = collection(userSnapshot.ref, "penalties");
            await addDoc(penaltiesCollectionRef, data);
            return entityRef;
        }
    }

    async findPenalty(id: string, penaltyId: string){
        const parentDocumentRef = doc(firebase.db, this.collection, id);

        const penaltyRef = doc(parentDocumentRef, "penalties", penaltyId);

        const penaltySnapshot = await getDoc(penaltyRef);

        if (penaltySnapshot.exists()) {
            const penaltyData = penaltySnapshot.data();
            return { id: penaltySnapshot.id, data: penaltyData };
        }
    }

    async getPenalties(parentDocumentId: string) {
        const subcollectionRef = collection(firebase.db, this.collection, parentDocumentId, "penalties");
    
        const subcollectionSnapshot = await getDocs(subcollectionRef);
    
        // Mapea los documentos y extrae sus datos
        const subcollectionDocuments = subcollectionSnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
    
        return subcollectionDocuments;
    }

}

export default EntityService;